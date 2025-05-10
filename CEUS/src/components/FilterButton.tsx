// src/components/FilterButton.tsx
import React from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${isActive
          ? 'bg-blue-600 text-white'
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
        }
      `}
    >
      {label}
    </button>
  );
};

export default FilterButton;