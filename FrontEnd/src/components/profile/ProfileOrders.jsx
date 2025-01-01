import React from 'react';
import { Package, ChevronRight } from 'lucide-react';

export const ProfileOrders = () => {
  const orders = [
    {
      id: '1',
      date: 'March 24, 2024',
      total: 299.99,
      status: 'Delivered',
      items: [
        {
          name: 'Premium Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
        }
      ]
    },
    // Add more orders...
  ];

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              {order.status}
            </span>
          </div>

          {order.items.map((item) => (
            <div key={item.name} className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h4 className="text-lg font-medium">{item.name}</h4>
              </div>
            </div>
          ))}

          <div className="mt-4 flex items-center justify-between pt-4 border-t">
            <p className="font-medium">Total: ${order.total}</p>
            <button className="btn-secondary flex items-center space-x-2">
              <span>View Details</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};