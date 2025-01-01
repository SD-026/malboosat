import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { User } from '../../types/user';

interface ProfileStatsProps {
  user: User;
}

export const ProfileStats<ProfileStatsProps> = ({ user }) => {
  const stats = [
    { icon: ShoppingBag, label: 'Orders', value: '12' },
    { icon: Heart, label: 'Wishlist', value: '24' },
    { icon: Star, label: 'Reviews', value: '8' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="text-center p-4 rounded-lg bg-white shadow-sm">
          <Icon className="h-6 w-6 mx-auto text-gray-600" />
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      ))}
    </div>
  );
};