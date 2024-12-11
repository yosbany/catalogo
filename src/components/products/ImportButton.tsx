import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { importProducts } from '../../utils/excel/importer';
import { ImportResultsModal } from './ImportResultsModal';
import { ImportResult } from '../../utils/excel/types';
import toast from 'react-hot-toast';

export const ImportButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { products, updateProduct, addProduct } = useProducts();
  const [importResults, setImportResults] = useState<ImportResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Procesando archivo...');

    try {
      const result = await importProducts(file, products, addProduct, updateProduct);
      setImportResults(result);
      setIsModalOpen(true);
      toast.success('Archivo procesado correctamente', { id: toastId });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error al procesar el archivo Excel',
        { id: toastId }
      );
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <Upload className="h-5 w-5 mr-2" />
        Importar
      </button>

      {importResults && (
        <ImportResultsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          results={importResults}
        />
      )}
    </>
  );
};