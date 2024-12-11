import { ExcelProduct } from './types';
import { Product } from '../../types';
import { validateBarcode } from '../validation';

export const transformExcelProduct = (excelProduct: ExcelProduct): Omit<Product, 'id'> => {
  const generateBarcode = () => {
    let barcode;
    do {
      barcode = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
    } while (!validateBarcode(barcode));
    return barcode;
  };

  return {
    name: String(excelProduct.name).trim(),
    price: Number(excelProduct.price),
    barcode: generateBarcode(),
    sku: String(excelProduct.sku).trim(),
    maxQuantity: Math.floor(Number(excelProduct.maximumSalesQuantity)),
    status: Number(excelProduct.active) as 0 | 1,
    section: String(excelProduct['category 1']).trim(),
    imageUrl: ''
  };
};