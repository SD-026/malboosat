import React from 'react';
import { Package, DollarSign, ShoppingBag, Star } from 'lucide-react';

export const SellerDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={<Package className="h-8 w-8 text-blue-500" />}
          title="Products"
          value="24"
        />
        <DashboardCard
          icon={<ShoppingBag className="h-8 w-8 text-green-500" />}
          title="Orders"
          value="12"
        />
        <DashboardCard
          icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
          title="Revenue"
          value="$2,345"
        />
        <DashboardCard
          icon={<Star className="h-8 w-8 text-purple-500" />}
          title="Rating"
          value="4.8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductsList />
        <RecentOrders />
      </div>
    </div>
  );
};

// const DashboardCard<{
//   icon: React.ReactNode;
//   title: string;
//   value: string;
// }> = ({ icon, title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <div className="flex items-center justify-between">
//       {icon}
//       <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//     </div>
//     <p className="text-2xl font-bold mt-2">{value}</p>
//   </div>
// );

const ProductsList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Your Products</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add Product
      </button>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((product) => (
        <div key={product} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <img
              src={`https://images.unsplash.com/photo-${1500000000000 + product}?w=80&h=80&fit=crop`}
              alt={`Product ${product}`}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">Product Name {product}</p>
              <p className="text-sm text-gray-500">${99.99 * product}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">Edit</button>
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentOrders = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-medium">Order #{order}12345</p>
            <p className="text-sm text-gray-500">Customer: John Doe</p>
          </div>
          <div className="text-right">
            <p className="font-medium">${99.99 * order}</p>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Pending
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);