import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { deleteProduct } = useProducts();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {product.status ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <p>Precio: ${product.price.toFixed(2)}</p>
          <p>SKU: {product.sku}</p>
          <p>Código: {product.barcode}</p>
          <p>Cantidad máx: {product.maxQuantity}</p>
          <p>Sección: {product.section}</p>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
            onClick={() => {/* Implement edit */}}
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};