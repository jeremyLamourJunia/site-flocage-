import React from 'react';

interface ColorPickerProps {
  colors: string[];
  selectedColor: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ colors, selectedColor, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-8 h-8 rounded-full border-2 transition-transform ${
            selectedColor === color ? 'border-indigo-600 scale-110' : 'border-gray-200'
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
          aria-label={`Couleur ${color}`}
        />
      ))}
    </div>
  );
}