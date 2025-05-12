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
        px-4 sm:px-5 py-2 rounded-md text-sm font-medium border-2 transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
        ${
          isActive
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-800'
        }
      `}
    >
      {label}
    </button>
  );
};

export default EventFilterButton;