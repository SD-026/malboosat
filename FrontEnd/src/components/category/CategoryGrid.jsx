import React from 'react';
import { ProductCard } from '../ProductCard';
import { Category } from '../../types';
import { products } from '../../data/products';

interface CategoryGridProps {
  category: Category;
}

export const CategoryGrid<CategoryGridProps> = ({ category }) => {
  const filteredProducts = products.filter(
    product => product.category === category.name
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">{filteredProducts.length} products</p>
        <select className="input-field max-w-xs">
          <option>Most Popular</option>
          <option>Newest</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};