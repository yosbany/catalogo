import React from 'react';
import { Download, Upload, Plus } from 'lucide-react';
import { Product } from '../../types';
import { exportToExcel } from '../../utils/excel';
import { ImportButton } from './ImportButton';

interface ProductActionsProps {
  products: Product[];
  onNewProduct: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ products, onNewProduct }) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => exportToExcel(products)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Download className="h-5 w-5 mr-2" />
        Exportar
      </button>
      <ImportButton />
      <button
        onClick={onNewProduct}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Nuevo Producto
      </button>
    </div>
  );
};