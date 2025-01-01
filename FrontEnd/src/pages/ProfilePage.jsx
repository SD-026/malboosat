import React from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileOrders } from '../components/profile/ProfileOrders';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { ProfileStats } from '../components/profile/ProfileStats';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('orders');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ProfileHeader user={user} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileStats user={user} />
            <nav className="mt-8 space-y-1">
              {['orders', 'wishlist', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full px-4 py-2 text-left rounded-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && <ProfileOrders />}
            {activeTab === 'settings' && <ProfileSettings user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};