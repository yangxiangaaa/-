
import React from 'react';
import { Category } from '../types';

interface TabsProps {
  categories: Category[];
  activeId: string;
  onChange: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ categories, activeId, onChange }) => {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-100 px-4 md:px-8 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide flex items-center gap-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`text-sm font-medium pb-1 transition-all relative ${
            activeId === cat.id 
              ? 'text-gray-900 font-bold' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {cat.label}
          {activeId === cat.id && (
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
