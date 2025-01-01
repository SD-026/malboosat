import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';



export const ProductCard = ({ product }) => {
  const { dispatch } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl card-hover animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Quick actions */}
      <div className="absolute top-4 right-4 space-y-2 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
        <button className="p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="p-4 bg-white">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.oldPrice}
              </span>
            )}
          </div>
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="btn-primary flex items-center space-x-2 transform hover:scale-105"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>

        {product.stock && product.stock < 5 && (
          <p className="mt-2 text-sm text-red-600">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};