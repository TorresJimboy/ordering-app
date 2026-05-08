import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { Product } from '../data/products';
import { auth, db } from '../lib/firebase';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

interface AppContextType {
  user: { email: string; name: string } | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  orders: Order[];
  isOrdersLoading: boolean;
  createOrder: () => Promise<Order>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const getDisplayName = (email: string | null, displayName: string | null) => {
  if (displayName) {
    return displayName;
  }

  return email?.split('@')[0] ?? 'User';
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser?.email
          ? {
              email: firebaseUser.email,
              name: getDisplayName(firebaseUser.email, firebaseUser.displayName),
            }
          : null
      );
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!auth.currentUser) {
      setIsAdmin(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, 'admins', auth.currentUser.uid),
      (snapshot) => {
        setIsAdmin(snapshot.exists());
      },
      () => {
        setIsAdmin(false);
      }
    );

    return unsubscribe;
  }, [user?.email]);

  useEffect(() => {
    if (!auth.currentUser) {
      setOrders([]);
      setIsOrdersLoading(false);
      return;
    }

    setIsOrdersLoading(true);
    const ordersQuery = query(
      collection(db, 'users', auth.currentUser.uid, 'orders'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      ordersQuery,
      (snapshot) => {
        const nextOrders = snapshot.docs.map((orderDoc) => {
          const data = orderDoc.data() as Omit<Order, 'id'>;
          return {
            id: orderDoc.id,
            ...data,
          };
        });

        setOrders(nextOrders);
        setIsOrdersLoading(false);
      },
      () => {
        setOrders([]);
        setIsOrdersLoading(false);
      }
    );

    return unsubscribe;
  }, [user?.email]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch {
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });
      setUser({ email, name });
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const createOrder = async (): Promise<Order> => {
    if (!auth.currentUser) {
      throw new Error('You must be signed in to place an order.');
    }

    const orderData = {
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending' as const,
      createdAt: serverTimestamp(),
    };

    const orderRef = await addDoc(
      collection(db, 'users', auth.currentUser.uid, 'orders'),
      orderData
    );

    clearCart();

    return {
      id: orderRef.id,
      items: orderData.items,
      total: orderData.total,
      date: orderData.date,
      status: orderData.status,
    };
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        isAuthLoading,
        login,
        signup,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        orders,
        isOrdersLoading,
        createOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
