import { ExcelProduct, ImportResult, ImportError } from './types';
import { Product } from '../../types';
import { readExcelFile } from './reader';
import { validateExcelProduct } from './validator';
import { transformExcelProduct } from './transformer';

export const importProducts = async (
  file: File,
  existingProducts: Product[],
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>,
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
): Promise<ImportResult> => {
  const result: ImportResult = {
    created: 0,
    updated: 0,
    errors: []
  };

  try {
    const excelProducts = await readExcelFile(file);

    for (const excelProduct of excelProducts) {
      try {
        const validationErrors = validateExcelProduct(excelProduct);
        
        if (validationErrors.length > 0) {
          result.errors.push({
            sku: String(excelProduct.sku || 'SKU no especificado'),
            errors: validationErrors
          });
          continue;
        }

        const transformedProduct = transformExcelProduct(excelProduct);
        const existingProduct = existingProducts.find(p => p.sku === transformedProduct.sku);

        if (existingProduct) {
          await updateProduct(existingProduct.id, transformedProduct);
          result.updated++;
        } else {
          await addProduct(transformedProduct);
          result.created++;
        }
      } catch (error) {
        result.errors.push({
          sku: String(excelProduct.sku || 'SKU no especificado'),
          errors: [(error as Error).message || 'Error desconocido']
        });
      }
    }
  } catch (error) {
    throw error;
  }

  return result;
};