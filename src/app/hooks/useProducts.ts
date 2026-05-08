import { useEffect, useState } from 'react';
import { Product, products as defaultProducts } from '../data/products';
import { getCachedProducts, sortProducts, subscribeToProducts } from '../services/products';

export const useProducts = () => {
  const initialProducts = getCachedProducts() ?? sortProducts(defaultProducts);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUsingDefaults, setIsUsingDefaults] = useState(!getCachedProducts());

  useEffect(() => {
    const unsubscribe = subscribeToProducts(
      (nextProducts) => {
        setProducts(nextProducts.length > 0 ? nextProducts : sortProducts(defaultProducts));
        setIsUsingDefaults(nextProducts.length === 0);
        setError('');
        setIsLoading(false);
      },
      () => {
        setProducts(initialProducts);
        setIsUsingDefaults(true);
        setError('Using local products because Firestore products could not be loaded.');
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return {
    products,
    isLoading,
    error,
    isUsingDefaults,
  };
};
