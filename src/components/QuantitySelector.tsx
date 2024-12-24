import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ quantity, onChange, min = 1, max = 1000 }: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={decrease}
        disabled={quantity <= min}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (value >= min && value <= max) {
            onChange(value);
          }
        }}
        className="w-16 text-center border border-gray-300 rounded-md p-2"
      />
      <button
        onClick={increase}
        disabled={quantity >= max}
        className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}