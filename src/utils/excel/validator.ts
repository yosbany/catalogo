import { ExcelProduct } from './types';
import { validatePrice, validateQuantity } from '../validation';

export const validateExcelProduct = (product: ExcelProduct): string[] => {
  const errors: string[] = [];

  // Required fields validation
  if (!product.sku?.toString().trim()) {
    errors.push('SKU es requerido');
  }
  
  if (!product.name?.toString().trim()) {
    errors.push('Nombre es requerido');
  }
  
  if (!product['category 1']?.toString().trim()) {
    errors.push('Categoría es requerida');
  }

  // Price validation
  if (product.price === undefined || product.price === null) {
    errors.push('Precio es requerido');
  } else if (!validatePrice(product.price.toString())) {
    errors.push('Precio debe ser un número válido mayor o igual a 0');
  }

  // Status validation
  if (product.active === undefined || product.active === null) {
    errors.push('Estado es requerido');
  } else if (![0, 1].includes(Number(product.active))) {
    errors.push('Estado debe ser 0 o 1');
  }

  // Maximum sales quantity validation
  if (product.maximumSalesQuantity === undefined || product.maximumSalesQuantity === null) {
    errors.push('Cantidad máxima es requerida');
  } else if (!validateQuantity(product.maximumSalesQuantity.toString())) {
    errors.push('Cantidad máxima debe ser un número entero positivo');
  }

  return errors;
};