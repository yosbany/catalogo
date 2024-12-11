import React from 'react';
import { Modal } from '../ui/Modal';
import { ImportResult } from '../../utils/excel/types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ImportResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ImportResult;
}

export const ImportResultsModal: React.FC<ImportResultsModalProps> = ({
  isOpen,
  onClose,
  results
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resultados de la Importación"
    >
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="font-semibold text-green-800">Productos Creados</div>
            <div className="text-2xl font-bold text-green-600">{results.created}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="font-semibold text-blue-800">Productos Actualizados</div>
            <div className="text-2xl font-bold text-blue-600">{results.updated}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="font-semibold text-orange-800">Errores</div>
            <div className="text-2xl font-bold text-orange-600">{results.errors.length}</div>
          </div>
        </div>

        {/* Success Message */}
        {(results.created > 0 || results.updated > 0) && (
          <div className="flex items-start space-x-3 bg-green-50 p-4 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Operaciones Exitosas</h3>
              <p className="text-green-700 text-sm mt-1">
                Se {results.created > 0 ? `crearon ${results.created} productos` : ''}
                {results.created > 0 && results.updated > 0 ? ' y ' : ''}
                {results.updated > 0 ? `actualizaron ${results.updated} productos` : ''}
                correctamente.
              </p>
            </div>
          </div>
        )}

        {/* Errors List */}
        {results.errors.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-800">Errores Encontrados</h3>
                <p className="text-orange-700 text-sm mt-1">
                  Se encontraron errores en {results.errors.length} productos.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Errores
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.errors.map((error, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {error.sku}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <ul className="list-disc list-inside">
                          {error.errors.map((err, i) => (
                            <li key={i}>{err}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};