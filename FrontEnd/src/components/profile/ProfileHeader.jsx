import React from 'react';
import { Camera, MapPin } from 'lucide-react';
import { User } from '../../types/user';

interface ProfileHeaderProps {
  user: User;
}

export const ProfileHeader<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="relative">
      {/* Cover photo */}
      <div className="h-48 w-full bg-gradient-to-r from-blue-600 to-blue-800">
        <button className="absolute right-4 bottom-4 btn-secondary flex items-center space-x-2">
          <Camera className="h-5 w-5" />
          <span>Change Cover</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-24">
          <div className="flex flex-col sm:flex-row items-center">
            {/* Profile photo */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Profile info */}
            <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 flex items-center justify-center sm:justify-start mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                New York, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};