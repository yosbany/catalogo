import React, { useState, useEffect } from 'react';
import { X, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useProducts } from '../../hooks/useProducts';
import toast from 'react-hot-toast';
import { validateGoogleDriveUrl } from '../../utils/validation';
import { getGoogleDriveImageUrl } from '../../utils/images';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    barcode: '',
    sku: '',
    maxQuantity: '',
    status: '1',
    section: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        barcode: product.barcode,
        sku: product.sku,
        maxQuantity: product.maxQuantity.toString(),
        status: product.status.toString(),
        section: product.section,
        imageUrl: product.imageUrl || ''
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.imageUrl && !validateGoogleDriveUrl(formData.imageUrl)) {
        throw new Error('La URL debe ser de Google Drive');
      }

      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        barcode: formData.barcode,
        sku: formData.sku,
        maxQuantity: parseInt(formData.maxQuantity),
        status: parseInt(formData.status) as 0 | 1,
        section: formData.section,
        imageUrl: formData.imageUrl
      };

      if (product) {
        await updateProduct(product.id, productData);
        toast.success('Producto actualizado correctamente');
      } else {
        await addProduct(productData);
        toast.success('Producto agregado correctamente');
      }
      
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const previewImageUrl = formData.imageUrl ? getGoogleDriveImageUrl(formData.imageUrl) : '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Código de Barras</label>
              <input
                type="text"
                required
                pattern="[0-9]{13}"
                title="Debe contener 13 dígitos"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad Máxima</label>
              <input
                type="number"
                required
                value={formData.maxQuantity}
                onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sección</label>
              <input
                type="text"
                required
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de la imagen (Google Drive)
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://drive.google.com/..."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {formData.imageUrl && (
                  <button
                    type="button"
                    onClick={() => setShowImagePreview(!showImagePreview)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition-colors"
                    title="Previsualizar imagen"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {showImagePreview && previewImageUrl && (
              <div className="mt-4">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={previewImageUrl}
                    alt="Vista previa"
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      toast.error('No se pudo cargar la imagen');
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};