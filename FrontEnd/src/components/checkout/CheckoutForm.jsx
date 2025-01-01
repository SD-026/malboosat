import React from 'react';
import { CreditCard, User, MapPin } from 'lucide-react';

export const CheckoutForm = () => {
  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <User className="h-6 w-6 text-gray-400" />
          <h2 className="ml-3 text-lg font-medium">Contact Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 input-field" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="mt-1 input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="mt-1 input-field" />
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <MapPin className="h-6 w-6 text-gray-400" />
          <h2 className="ml-3 text-lg font-medium">Shipping Address</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" className="mt-1 input-field" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" className="mt-1 input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" className="mt-1 input-field" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input type="text" className="mt-1 input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select className="mt-1 input-field">
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-gray-400" />
          <h2 className="ml-3 text-lg font-medium">Payment Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input type="text" className="mt-1 input-field" placeholder="•••• •••• •••• ••••" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input type="text" className="mt-1 input-field" placeholder="MM/YY" />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">CVC</label>
              <input type="text" className="mt-1 input-field" placeholder="•••" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};