import * as XLSX from 'xlsx';
import { Product } from '../types';

interface ExcelProduct {
  'Nombre del producto': string;
  'Precio': number;
  'Código de barras(Obligatorio)': string;
  'SKU': string;
  'Cantidad máxima (de unidades para vender por pedido)': number;
  'Activo': string;
  'Sección': string;
  'Imagen': string;
}

export const exportToExcel = (products: Product[]) => {
  // Transform products to match exact Excel column names
  const excelData: ExcelProduct[] = products.map(product => ({
    'Nombre del producto': product.name,
    'Precio': product.price,
    'Código de barras(Obligatorio)': product.barcode,
    'SKU': product.sku,
    'Cantidad máxima (de unidades para vender por pedido)': product.maxQuantity,
    'Activo': product.status ? 'Activo' : 'Inactivo',
    'Sección': product.section,
    'Imagen': product.imageUrl
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Catálogo');
  
  // Auto-adjust column widths
  const maxWidth = 50;
  const colWidths = Object.keys(excelData[0] || {}).map(key => 
    Math.min(maxWidth, Math.max(key.length, ...excelData.map(row => 
      String(row[key as keyof ExcelProduct]).length
    )))
  );
  
  worksheet['!cols'] = colWidths.map(width => ({ width }));
  
  XLSX.writeFile(workbook, 'catalogo_productos.xlsx');
};