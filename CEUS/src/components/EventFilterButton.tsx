// src/components/EventFilterButton.tsx
import React from 'react';

interface EventFilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const EventFilterButton: React.FC<EventFilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
        transform hover:scale-105 active:scale-95
        ${
          isActive
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 hover:shadow-md'
        }
      `}
    >
      {label}
    </button>
  );
};

export default EventFilterButton;