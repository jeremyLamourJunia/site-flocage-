import React from 'react';

interface SizePickerProps {
  sizes: string[];
  selectedSize: string;
  onChange: (size: string) => void;
}

export default function SizePicker({ sizes, selectedSize, onChange }: SizePickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          className={`px-4 py-2 border rounded-md transition-colors ${
            selectedSize === size
              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
              : 'border-gray-200 text-gray-700 hover:border-indigo-600'
          }`}
          onClick={() => onChange(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}