import React from 'react';
import { ProductActions } from './ProductActions';
import { Product } from '../../types';

interface ProductHeaderProps {
  products: Product[];
  onNewProduct: () => void;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ products, onNewProduct }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
      <ProductActions products={products} onNewProduct={onNewProduct} />
    </div>
  );
};