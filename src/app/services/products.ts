import { Product, products as defaultProducts } from '../data/products';
import { readStored, writeStored } from '../lib/storage';

export type ProductFormData = Omit<Product, 'id'>;

const PRODUCTS_KEY = 'ordering-app-products';
const PRODUCTS_EVENT = 'ordering-app-products-updated';

export const sortProducts = (products: Product[]) =>
  [...products].sort((a, b) => a.name.localeCompare(b.name));

export const getCachedProducts = (): Product[] | null => {
  const stored = readStored<Product[] | null>(PRODUCTS_KEY, null);
  return Array.isArray(stored) && stored.every(product =>
    product && typeof product.id === 'string' && typeof product.name === 'string' &&
    typeof product.price === 'number' && Array.isArray(product.specifications)
  ) ? stored : null;
};

export const getProducts = () => sortProducts(getCachedProducts() ?? defaultProducts);

const saveProducts = (products: Product[]) => {
  writeStored(PRODUCTS_KEY, sortProducts(products));
  window.dispatchEvent(new Event(PRODUCTS_EVENT));
};

export const subscribeToProducts = (onProducts: (products: Product[]) => void) => {
  const sync = () => onProducts(getProducts());
  const onStorage = (event: StorageEvent) => {
    if (event.key === PRODUCTS_KEY || event.key === null) sync();
  };
  sync();
  window.addEventListener(PRODUCTS_EVENT, sync);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(PRODUCTS_EVENT, sync);
    window.removeEventListener('storage', onStorage);
  };
};

export const createProduct = async (product: ProductFormData) => {
  saveProducts([...getProducts(), { ...product, id: crypto.randomUUID() }]);
};

export const updateProduct = async (id: string, product: ProductFormData) => {
  const products = getProducts();
  if (!products.some(item => item.id === id)) throw new Error('Product no longer exists.');
  saveProducts(products.map(item => item.id === id ? { ...product, id } : item));
};

export const deleteProduct = async (id: string) => {
  saveProducts(getProducts().filter(product => product.id !== id));
};

export const importDefaultProducts = async () => {
  if (getProducts().length > 0) return false;
  saveProducts(defaultProducts);
  return true;
};