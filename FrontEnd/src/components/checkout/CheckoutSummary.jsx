import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { CartState } from '../../context/CartContext';

interface CheckoutSummaryProps {
  cart: CartState;
}

export const CheckoutSummary<CheckoutSummaryProps> = ({ cart }) => {
  const shipping = 9.99;
  const tax = cart.total * 0.1;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-fit lg:sticky lg:top-24">
      <div className="flex items-center mb-6">
        <ShoppingBag className="h-6 w-6 text-gray-400" />
        <h2 className="ml-3 text-lg font-medium">Order Summary</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {cart.items.map((item) => (
          <div key={item.id} className="py-4 flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">${item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>${cart.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900 pt-4 border-t">
          <span>Total</span>
          <span>${(cart.total + shipping + tax).toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full btn-primary mt-6">
        Place Order
      </button>

      <p className="mt-4 text-center text-sm text-gray-500">
        By placing your order, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};