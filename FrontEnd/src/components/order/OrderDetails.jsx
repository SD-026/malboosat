import React from 'react';
import { Package, MapPin } from 'lucide-react';

interface OrderDetailsProps {
  order: any; // Type should be properly defined
}

export const OrderDetails<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-500">Placed on {order.date}</p>
        </div>
        <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {order.status}
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {order.items.map((item: any) => (
          <div key={item.id} className="py-6 flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
            <div className="ml-6 flex-1">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-gray-500">Quantity: {item.quantity}</p>
              <p className="mt-1 font-medium">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
          <div className="ml-3">
            <p className="text-gray-900">{order.shippingAddress.name}</p>
            <p className="text-gray-500">{order.shippingAddress.street}</p>
            <p className="text-gray-500">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
            </p>
            <p className="text-gray-500">{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="space-y-2">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>${order.total - order.shipping - order.tax}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Shipping</span>
            <span>${order.shipping}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Tax</span>
            <span>${order.tax}</span>
          </div>
          <div className="flex justify-between text-lg font-medium text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};