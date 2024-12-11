export interface Product {
  id: string;
  name: string;
  price: number;
  barcode: string;
  sku: string;
  maxQuantity: number;
  status: 0 | 1;
  section: string;
  imageUrl: string;
}

export interface User {
  email: string;
  id: string;
}