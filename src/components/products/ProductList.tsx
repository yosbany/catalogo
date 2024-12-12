import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useSections } from '../../hooks/useSections';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { ProductForm } from './ProductForm';
import { ProductHeader } from './ProductHeader';
import { filterProducts } from '../../utils/filters';
import { Product } from '../../types';

export const ProductList = () => {
  const { products, loading } = useProducts();
  const sections = useSections(products);
  const [search, setSearch] = useState('');
  const [section, setSection] = useState('');
  const [status, setStatus] = useState<'' | '0' | '1'>('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const filteredProducts = filterProducts(products, search, section, status);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <ProductHeader 
        products={products} 
        onNewProduct={() => setIsFormOpen(true)} 
      />

      <ProductFilters
        search={search}
        setSearch={setSearch}
        section={section}
        setSection={setSection}
        status={status}
        setStatus={setStatus}
        sections={sections}
      />

      <ProductGrid 
        products={filteredProducts} 
        loading={loading} 
        onEdit={handleEdit} 
      />

      {isFormOpen && (
        <ProductForm 
          product={selectedProduct} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};