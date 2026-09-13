import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '../data/products';
import { readStored, writeStored } from '../lib/storage';

interface DemoUser {
  email: string;
  name: string;
}

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
  user: DemoUser | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
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

const SESSION_KEY = 'ordering-app-demo-user';
const userKey = (email: string) => `ordering-app-demo-profile:${email}`;
const cartKey = (email: string) => `ordering-app-demo-cart:${email}`;
const ordersKey = (email: string) => `ordering-app-demo-orders:${email}`;

const readUser = () => {
  const stored = readStored<DemoUser | null>(SESSION_KEY, null);
  return stored && typeof stored.email === 'string' && typeof stored.name === 'string'
    ? stored : null;
};

const readList = <T,>(key: string): T[] => {
  const stored = readStored<T[]>(key, []);
  return Array.isArray(stored) ? stored : [];
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(readUser);
  const [cart, setCart] = useState<CartItem[]>(() => user ? readList(cartKey(user.email)) : []);
  const [orders, setOrders] = useState<Order[]>(() => user ? readList(ordersKey(user.email)) : []);

  useEffect(() => {
    writeStored(SESSION_KEY, user);
    if (user) {
      writeStored(cartKey(user.email), cart);
      writeStored(ordersKey(user.email), orders);
    }
  }, [user, cart, orders]);

  const enterDemo = (email: string, name?: string) => {
    const identity = email.trim().toLowerCase() || 'guest@demo.local';
    const previous = readStored<DemoUser | null>(userKey(identity), null);
    const nextUser = {
      email: identity,
      name: name?.trim() || previous?.name || (email.trim() ? email.trim().split('@')[0] : 'Guest'),
    };
    writeStored(userKey(identity), nextUser);
    writeStored(SESSION_KEY, nextUser);
    setCart(readList(cartKey(identity)));
    setOrders(readList(ordersKey(identity)));
    setUser(nextUser);
    return true;
  };

  // Passwords are intentionally ignored and never stored in this static demo.
  const login = async (email: string) => enterDemo(email);
  const signup = async (name: string, email: string) => enterDemo(email, name);

  const logout = async () => {
    writeStored(SESSION_KEY, null);
    setUser(null);
    setCart([]);
    setOrders([]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      return existingItem
        ? prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const createOrder = async (): Promise<Order> => {
    if (!user) throw new Error('Enter the demo to place an order.');
    if (cart.length === 0) throw new Error('Add an item to your cart first.');

    const order: Order = {
      id: `DEMO-${crypto.randomUUID()}`,
      items: cart.map(item => ({ ...item, product: { ...item.product } })),
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'confirmed',
    };
    const nextOrders = [order, ...orders];
    writeStored(ordersKey(user.email), nextOrders);
    writeStored(cartKey(user.email), []);
    setOrders(nextOrders);
    clearCart();
    return order;
  };

  return (
    <AppContext.Provider value={{
      user, isAdmin: Boolean(user), isAuthLoading: false, login, signup, logout,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal,
      orders, isOrdersLoading: false, createOrder,
    }}>
      {children}
    </AppContext.Provider>
  );
};