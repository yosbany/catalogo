import * as XLSX from 'xlsx';
import { ExcelProduct } from './types';

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
        
        if (products.length === 0) {
          throw new Error('El archivo Excel no contiene productos');
        }
        
        resolve(products);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Error al leer el archivo Excel'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsBinaryString(file);
  });
};