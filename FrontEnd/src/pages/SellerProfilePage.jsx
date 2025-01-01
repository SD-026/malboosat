import React from 'react';
import { SellerCard } from '../components/seller/SellerCard';
import { SellerProducts } from '../components/seller/SellerProducts';
import { SellerReviews } from '../components/seller/SellerReviews';
import { useAuth } from '../context/AuthContext';

export const SellerProfilePage = () => {
  const seller = {
    id: '1',
    name: 'Tech Store',
    email: 'store@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    storeName: 'Premium Tech Store',
    storeDescription: 'Your one-stop shop for premium electronics and accessories',
    rating: 4.8,
    totalSales: 1234,
    location: 'New York, USA',
    joinedDate: 'March 2024'
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <SellerCard seller={seller} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SellerProducts sellerId={seller.id} />
          </div>
          <div>
            <SellerReviews sellerId={seller.id} />
          </div>
        </div>
      </div>
    </div>
  );
};