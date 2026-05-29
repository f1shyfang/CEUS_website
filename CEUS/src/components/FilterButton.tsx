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
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={onClick}
      className={`
        px-4 sm:px-5 py-2 rounded-md text-sm font-medium border
        transition-colors duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${
          isActive
            ? 'bg-[#1B397E] text-white border-[#1B397E] hover:bg-blue-700 hover:border-blue-700'
            : 'bg-white text-[#1B397E] border-gray-200 hover:bg-[#1B397E]/5 hover:border-[#1B397E]'
        }
      `}
    >
      {label}
    </button>
  );
};

export default FilterButton;
