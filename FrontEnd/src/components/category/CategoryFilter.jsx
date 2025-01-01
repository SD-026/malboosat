import React from 'react';
import { X } from 'lucide-react';

interface CategoryFilterProps {
  onClose: () => void;
}

export const CategoryFilter<CategoryFilterProps> = ({ onClose }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between lg:hiden">
        <h2 className="text-lg font-medium">Filters</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-2">
          <input type="range" className="w-full" min="0" max="1000" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </div>

      {/* Color filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Colors</h3>
        <div className="grid grid-cols-6 gap-2">
          {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-gray-500'].map((color) => (
            <button
              key={color}
              className={`w-8 h-8 rounded-full ${color} ring-2 ring-offset-2 ring-transparent hover:ring-gray-400 transition-all`}
            />
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Sizes</h3>
        <div className="grid grid-cols-4 gap-2">
          {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
            <button
              key={size}
              className="px-4 py-2 border rounded-lg text-sm hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
              <span className="ml-2">
                {'★'.repeat(rating)}{'☆'.repeat(5-rating)} & up
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};