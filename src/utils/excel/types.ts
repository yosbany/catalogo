import { Product } from '../../types';

export interface ExcelProduct {
  sku: string;
  name: string;
  price: number;
  active: number;
  maximumSalesQuantity: number;
  'category 1': string;
}

export interface ImportResult {
  created: number;
  updated: number;
  errors: ImportError[];
}

export interface ImportError {
  sku: string;
  errors: string[];
}