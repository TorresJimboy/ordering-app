import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, products as defaultProducts } from '../data/products';

export type ProductFormData = Omit<Product, 'id'>;

const productsCollection = collection(db, 'products');
const PRODUCTS_CACHE_KEY = 'ordering-app-products';

export const sortProducts = (products: Product[]) =>
  [...products].sort((a, b) => a.name.localeCompare(b.name));

export const getCachedProducts = () => {
  try {
    const cachedProducts = window.localStorage.getItem(PRODUCTS_CACHE_KEY);
    return cachedProducts ? (JSON.parse(cachedProducts) as Product[]) : null;
  } catch {
    return null;
  }
};

const cacheProducts = (products: Product[]) => {
  try {
    window.localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
  } catch {
    // Cache failures should not block product browsing.
  }
};

export const subscribeToProducts = (
  onProducts: (products: Product[]) => void,
  onError: (error: Error) => void
) => {
  return onSnapshot(
    productsCollection,
    (snapshot) => {
      const products = sortProducts(
        snapshot.docs.map((productDoc) => ({
          id: productDoc.id,
          ...productDoc.data(),
        })) as Product[]
      );

      if (products.length > 0) {
        cacheProducts(products);
      }

      onProducts(products);
    },
    onError
  );
};

export const createProduct = async (product: ProductFormData) => {
  const snapshot = await getDocs(productsCollection);
  const nextId = String(
    snapshot.docs.reduce((highestId, productDoc) => {
      const numericId = Number(productDoc.id);
      return Number.isFinite(numericId) ? Math.max(highestId, numericId) : highestId;
    }, 0) + 1
  );

  const productRef = doc(db, 'products', nextId);
  const existingProduct = await getDoc(productRef);

  if (existingProduct.exists()) {
    throw new Error('A product with the next generated ID already exists. Please try again.');
  }

  await setDoc(productRef, product);
};

export const updateProduct = async (id: string, product: ProductFormData) => {
  await updateDoc(doc(db, 'products', id), product);
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};

export const importDefaultProducts = async () => {
  const snapshot = await getDocs(productsCollection);

  if (!snapshot.empty) {
    return false;
  }

  await Promise.all(
    defaultProducts.map((product) => {
      const { id, ...productData } = product;
      return setDoc(doc(db, 'products', id), productData);
    })
  );

  return true;
};
