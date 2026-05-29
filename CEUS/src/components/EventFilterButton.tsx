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
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`
        px-5 py-2.5 rounded-lg text-sm font-semibold
        transition-colors duration-200 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
        motion-safe:transition-transform motion-safe:active:scale-95
        ${
          isActive
            ? 'bg-[#1B397E] text-white hover:bg-blue-700'
            : 'bg-white text-[#1B397E] border border-gray-200 hover:bg-[#1B397E]/5 hover:border-gray-300'
        }
      `}
    >
      {label}
    </button>
  );
};

export default EventFilterButton;
