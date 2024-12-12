import React, { useState } from 'react';
import { Edit, Trash2, Barcode, Package, DollarSign, Box, Tag, Layers } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import { getGoogleDriveImageUrl } from '../../utils/images';
import { ConfirmationModal } from '../ui/ConfirmationModal';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit }) => {
  const { deleteProduct } = useProducts();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const imageUrl = getGoogleDriveImageUrl(product.imageUrl);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {imageUrl && (
          <div className="w-full h-48 bg-gray-100">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.status ? 'Activo' : 'Inactivo'}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <DollarSign className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="font-medium">Precio:</span>
              <span className="ml-2">${product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Tag className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="font-medium">SKU:</span>
              <span className="ml-2 font-mono">{product.sku}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Barcode className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="font-medium">Código:</span>
              <span className="ml-2 font-mono">{product.barcode}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Box className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="font-medium">Cantidad máx:</span>
              <span className="ml-2">{product.maxQuantity}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Layers className="h-4 w-4 mr-2 text-indigo-600" />
              <span className="font-medium">Sección:</span>
              <span className="ml-2">{product.section}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
            <button
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              onClick={() => onEdit(product)}
              title="Editar producto"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              onClick={() => setShowDeleteConfirmation(true)}
              title="Eliminar producto"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDelete}
        title="Eliminar Producto"
        message={`¿Estás seguro que deseas eliminar el producto "${product.name}"? Esta acción no se puede deshacer.`}
      />
    </>
  );
};