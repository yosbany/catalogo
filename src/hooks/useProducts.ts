import { useState, useEffect } from 'react';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { database } from '../config/firebase';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsList = Object.entries(data).map(([id, product]) => ({
          id,
          ...(product as Omit<Product, 'id'>)
        }));
        setProducts(productsList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const productsRef = ref(database, 'products');
      await push(productsRef, product);
    } catch (error) {
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const productRef = ref(database, `products/${id}`);
      await update(productRef, updates);
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const productRef = ref(database, `products/${id}`);
      await remove(productRef);
    } catch (error) {
      throw error;
    }
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  };
};