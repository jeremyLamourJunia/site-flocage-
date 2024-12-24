import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { SizeQuantity } from '../types/customization';

interface SizeQuantitySelectorProps {
  sizes: string[];
  sizeQuantities: SizeQuantity[];
  onChange: (sizeQuantities: SizeQuantity[]) => void;
  minQuantity: number;
  totalMinQuantity: number;
}

export default function SizeQuantitySelector({ 
  sizes, 
  sizeQuantities, 
  onChange, 
  minQuantity,
  totalMinQuantity
}: SizeQuantitySelectorProps) {
  const getTotalQuantity = () => {
    return sizeQuantities.reduce((sum, sq) => sum + sq.quantity, 0);
  };

  const addSize = () => {
    const availableSizes = sizes.filter(
      size => !sizeQuantities.find(sq => sq.size === size)
    );
    if (availableSizes.length > 0) {
      onChange([...sizeQuantities, { size: availableSizes[0], quantity: minQuantity }]);
    }
  };

  const removeSize = (index: number) => {
    const newSizeQuantities = sizeQuantities.filter((_, i) => i !== index);
    if (getTotalQuantity() >= totalMinQuantity || newSizeQuantities.length === 0) {
      onChange(newSizeQuantities);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity >= minQuantity) {
      const newSizeQuantities = [...sizeQuantities];
      newSizeQuantities[index].quantity = quantity;
      onChange(newSizeQuantities);
    }
  };

  const updateSize = (index: number, size: string) => {
    const newSizeQuantities = [...sizeQuantities];
    newSizeQuantities[index].size = size;
    onChange(newSizeQuantities);
  };

  const currentTotal = getTotalQuantity();

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-500 mb-2">
        Total actuel : {currentTotal} articles
        {currentTotal < totalMinQuantity && (
          <span className="text-red-500 ml-2">
            (Minimum requis : {totalMinQuantity} articles au total)
          </span>
        )}
      </div>

      {sizeQuantities.map((sizeQuantity, index) => (
        <div key={index} className="flex items-center space-x-4">
          <select
            value={sizeQuantity.size}
            onChange={(e) => updateSize(index, e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {sizes.map((size) => (
              <option
                key={size}
                value={size}
                disabled={sizeQuantities.some(
                  (sq, i) => i !== index && sq.size === size
                )}
              >
                {size}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(index, Math.max(minQuantity, sizeQuantity.quantity - 1))}
              className="p-1 rounded-md border border-gray-300"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              min={minQuantity}
              value={sizeQuantity.quantity}
              onChange={(e) => updateQuantity(index, Math.max(minQuantity, parseInt(e.target.value) || minQuantity))}
              className="w-16 text-center border border-gray-300 rounded-md p-1"
            />
            <button
              onClick={() => updateQuantity(index, sizeQuantity.quantity + 1)}
              className="p-1 rounded-md border border-gray-300"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => removeSize(index)}
            className="p-1 text-gray-400 hover:text-gray-600"
            disabled={sizeQuantities.length === 1 && currentTotal < totalMinQuantity}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ))}

      {sizeQuantities.length < sizes.length && (
        <button
          onClick={addSize}
          className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-1" />
          Ajouter une taille
        </button>
      )}
    </div>
  );
}