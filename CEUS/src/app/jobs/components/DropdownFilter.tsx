'use client';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { cn } from '../../../lib/utils';

interface DropdownFilterProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
  pluralLabel?: string;
}

export default function DropdownFilter({
  label,
  options,
  selected,
  onChange,
  pluralLabel,
}: DropdownFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const display = (() => {
    if (selected.length === 0) return label;
    if (selected.length === 1) return selected[0];
    return `${selected.length} ${pluralLabel ?? label}`;
  })();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors',
          'bg-white border-gray-200 hover:border-gray-300',
          selected.length > 0 ? 'text-gray-900 border-blue-300 bg-blue-50' : 'text-gray-600'
        )}
      >
        <span>{display}</span>
        <FaChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 min-w-[14rem] bg-white border border-gray-200 rounded-lg shadow-xl py-1 max-h-80 overflow-y-auto">
          {options.length === 0 && (
            <div className="px-3 py-2 text-xs text-gray-400">No options</div>
          )}
          {options.map((opt) => {
            const isOn = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className={cn(
                  'flex items-center w-full gap-3 px-3 py-2 text-sm text-left',
                  'hover:bg-gray-50 transition-colors',
                  isOn && 'bg-blue-50'
                )}
              >
                <span
                  className={cn(
                    'w-4 h-4 rounded border flex items-center justify-center flex-shrink-0',
                    isOn ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                  )}
                >
                  {isOn && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
                <span className="text-gray-700 truncate">{opt}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
