import { Product } from '../types';

export const filterProducts = (
  products: Product[],
  search: string,
  section: string,
  status: '' | '0' | '1'
): Product[] => {
  return products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode.includes(search);
    const matchesSection = section ? product.section === section : true;
    const matchesStatus = status ? product.status === Number(status) : true;
    
    return matchesSearch && matchesSection && matchesStatus;
  });
};