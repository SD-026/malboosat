import React from 'react';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import { useCart } from '../context/CartContext';

export const CheckoutPage= () => {
  const { state } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CheckoutForm />
          <CheckoutSummary cart={state} />
        </div>
      </div>
    </div>
  );
};