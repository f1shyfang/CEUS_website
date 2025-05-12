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
          // Active state can remain similar, blue on white text works well
          ? 'bg-blue-600 text-white'
          // Inactive state adjusted for light theme
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800'
        }
      `}
    >
      {label}
    </button>
  );
};

export default FilterButton;