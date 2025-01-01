import React from 'react';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Total Users"
          value="1,234"
        />
        <DashboardCard
          icon={<Package className="h-8 w-8 text-green-500" />}
          title="Products"
          value="456"
        />
        <DashboardCard
          icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
          title="Revenue"
          value="$12,345"
        />
        <DashboardCard
          icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
          title="Growth"
          value="+23%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopSellers />
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

const RecentOrders = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-medium">Order #{order}23456</p>
            <p className="text-sm text-gray-500">2 items • $199.99</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            Completed
          </span>
        </div>
      ))}
    </div>
  </div>
);

const TopSellers = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Top Sellers</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((seller) => (
        <div key={seller} className="flex items-center space-x-4 border-b pb-4">
          <img
            src={`https://images.unsplash.com/photo-${1500000000000 + seller}?w=32&h=32&fit=crop&crop=face`}
            alt={`Seller ${seller}`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">Seller Name {seller}</p>
            <p className="text-sm text-gray-500">${1000 * seller} sales</p>
          </div>
          <span className="text-sm font-medium text-blue-600">View</span>
        </div>
      ))}
    </div>
  </div>
);