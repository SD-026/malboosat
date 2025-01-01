import React from 'react';
import { OrderDetails } from '../components/order/OrderDetails';
import { OrderTimeline } from '../components/order/OrderTimeline';
import { OrderActions } from '../components/order/OrderActions';

export const OrderViewPage = () => {
  const order = {
    id: 'ORD123456',
    date: 'March 24, 2024',
    status: 'In Transit',
    total: 299.99,
    shipping: 9.99,
    tax: 29.99,
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    },
    timeline: [
      { date: 'March 24, 2024', status: 'Order Placed' },
      { date: 'March 25, 2024', status: 'Payment Confirmed' },
      { date: 'March 26, 2024', status: 'Shipped' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderDetails order={order} />
            <OrderActions order={order} />
          </div>
          <div>
            <OrderTimeline timeline={order.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
};