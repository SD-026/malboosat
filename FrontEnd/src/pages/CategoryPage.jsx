import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { CategoryFilter } from '../components/category/CategoryFilter';
import { CategoryGrid } from '../components/category/CategoryGrid';
import { CategoryHeader } from '../components/category/CategoryHeader';
import { useCategories } from '../hooks/useCategories';

export const CategoryPage = () => {
  const { categories, activeCategory, setActiveCategory } = useCategories();
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <CategoryHeader category={activeCategory} />
      
      {/* Mobile filter dialog */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg z-40">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full btn-secondary flex items-center justify-center"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span>Filters</span>
          <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters */}
          <div className={`
            lg:block
            ${showFilters ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto' : 'hidden'}
          `}>
            <CategoryFilter onClose={() => setShowFilters(false)} />
          </div>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <CategoryGrid category={activeCategory} />
          </div>
        </div>
      </div>
    </div>
  );
};