import React from 'react';
import { User, Package, CreditCard, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const CustomerProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <div className="text-white">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="opacity-90">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileSection
              icon={<User className="h-5 w-5 text-blue-600" />}
              title="Personal Information"
            >
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {user?.name}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Member since:</span> March 2024</p>
              </div>
            </ProfileSection>

            <ProfileSection
              icon={<Package className="h-5 w-5 text-blue-600" />}
              title="Order History"
            >
              <div className="space-y-2">
                <p><span className="font-medium">Total Orders:</span> 12</p>
                <p><span className="font-medium">Pending:</span> 2</p>
                <p><span className="font-medium">Completed:</span> 10</p>
              </div>
            </ProfileSection>

            <ProfileSection
              icon={<MapPin className="h-5 w-5 text-blue-600" />}
              title="Shipping Address"
            >
              <div className="space-y-2">
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
              </div>
            </ProfileSection>

            <ProfileSection
              icon={<CreditCard className="h-5 w-5 text-blue-600" />}
              title="Payment Methods"
            >
              <div className="space-y-2">
                <p>•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Add new card
                </button>
              </div>
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// const ProfileSection<{
//   icon: React.ReactNode;
//   title: string;
//   children: React.ReactNode;
// }> = ({ icon, title, children }) => (
//   <div className="border rounded-lg p-4">
//     <div className="flex items-center space-x-2 mb-4">
//       {icon}
//       <h2 className="text-lg font-semibold">{title}</h2>
//     </div>
//     {children}
//   </div>
// );