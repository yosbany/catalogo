import * as XLSX from 'xlsx';
import { Product } from '../types';
import { validateBarcode, validatePrice, validateQuantity } from './validation';

interface ExcelProduct {
  sku: string;
  name: string;
  price: number;
  active: number;
  maximumSalesQuantity: number;
  'category 1': string;
}

export const readExcelFile = (file: File): Promise<ExcelProduct[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets['Products'];
        
        if (!worksheet) {
          throw new Error('No se encontró la hoja "Products" en el archivo Excel');
        }

        const products = XLSX.utils.sheet_to_json<ExcelProduct>(worksheet);
        resolve(products);
      } catch (error) {
        reject(new Error('Error al leer el archivo Excel'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsBinaryString(file);
  });
};

export const validateExcelProduct = (product: ExcelProduct): string[] => {
  const errors: string[] = [];

  // Required fields validation
  if (!product.sku?.trim()) errors.push('SKU es requerido');
  if (!product.name?.trim()) errors.push('Nombre es requerido');
  if (!product['category 1']?.trim()) errors.push('Categoría es requerida');

  // Price validation
  if (product.price === undefined || product.price === null) {
    errors.push('Precio es requerido');
  } else if (!validatePrice(product.price.toString())) {
    errors.push('Precio debe ser un número válido mayor o igual a 0');
  }

  // Status validation
  if (product.active === undefined || product.active === null) {
    errors.push('Estado es requerido');
  } else if (![0, 1].includes(product.active)) {
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

export const transformExcelProduct = (excelProduct: ExcelProduct): Omit<Product, 'id'> => {
  // Generate a random 13-digit barcode
  const generateBarcode = () => {
    let barcode;
    do {
      barcode = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
    } while (!validateBarcode(barcode));
    return barcode;
  };

  return {
    name: excelProduct.name.trim(),
    price: Number(excelProduct.price),
    barcode: generateBarcode(),
    sku: excelProduct.sku.trim(),
    maxQuantity: Math.floor(Number(excelProduct.maximumSalesQuantity)),
    status: Number(excelProduct.active) as 0 | 1,
    section: excelProduct['category 1'].trim(),
    imageUrl: ''
  };
};