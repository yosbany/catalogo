import { useMemo } from 'react';
import { Product } from '../types';

export const useSections = (products: Product[]) => {
  const sections = useMemo(() => {
    const uniqueSections = new Set(products.map(p => p.section));
    return Array.from(uniqueSections).sort();
  }, [products]);

  return sections;
};