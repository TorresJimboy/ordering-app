import { useEffect, useState } from 'react';
import { getProducts, subscribeToProducts } from '../services/products';

export const useProducts = () => {
  const [products, setProducts] = useState(getProducts);
  useEffect(() => subscribeToProducts(setProducts), []);

  return { products, isLoading: false };
};