import React from 'react';
import { Search } from 'lucide-react';
import { SectionSelect } from '../sections/SectionSelect';

interface ProductFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  section: string;
  setSection: (value: string) => void;
  status: '' | '0' | '1';
  setStatus: (value: '' | '0' | '1') => void;
  sections: string[];
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  search,
  setSearch,
  section,
  setSection,
  status,
  setStatus,
  sections
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar por nombre, SKU o código de barras"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <SectionSelect
          value={section}
          onChange={setSection}
          sections={sections}
          className="flex-1"
        />

        <select
          className="flex-1 border rounded-lg px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as '' | '0' | '1')}
        >
          <option value="">Todos los estados</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>
    </div>
  );
};