import React from 'react';
import { Tag } from 'lucide-react';

interface SectionSelectProps {
  value: string;
  onChange: (value: string) => void;
  sections: string[];
  className?: string;
}

export const SectionSelect: React.FC<SectionSelectProps> = ({
  value,
  onChange,
  sections,
  className = ''
}) => {
  return (
    <div className="relative">
      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white ${className}`}
      >
        <option value="">Todas las secciones</option>
        {sections.map((section) => (
          <option key={section} value={section}>{section}</option>
        ))}
      </select>
    </div>
  );
};