import { useState } from 'react';
import { Category } from '../types';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
  },
  {
    id: 2,
    name: 'Accessories',
    description: 'Fashion accessories and more',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200',
  },
];

export const useCategories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
  };
};