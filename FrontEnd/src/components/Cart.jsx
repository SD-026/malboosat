import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { state, dispatch } = useCart();

//   const updateQuantity = (id: number, quantity: number) => {
//     if (quantity < 1) return;
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   };

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
        <p className="text-gray-500 mt-1">Start shopping to add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-8">Shopping Cart</h2>
      
      <div className="divide-y divide-gray-200">
        {state.items.map((item) => (
          <div key={item.id} className="py-6 flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
            
            <div className="ml-6 flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">${item.price}</p>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${state.total.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        
        <div className="mt-6 space-y-4">
          <button className="btn-primary w-full flex items-center justify-center">
            <span>Proceed to Checkout</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="btn-secondary w-full">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};