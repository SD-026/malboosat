import React from 'react';
import { Category } from '../../types';

interface CategoryHeaderProps {
  category: Category;
}

export const CategoryHeader<CategoryHeaderProps> = ({ category }) => {
  return (
    <div className="relative">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-lg text-white/90">{category.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};