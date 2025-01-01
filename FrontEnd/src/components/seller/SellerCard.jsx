import React from 'react';
import { MapPin, Star, Package, Calendar, ExternalLink } from 'lucide-react';
import { Seller } from '../../types/user';

// interface SellerCardProps {
//   seller: Seller;
// }

export const SellerCard = () => {
  return (
    <div className="relative">
      <div className="h-64 w-full overflow-hidden">
        <img
          src={seller.coverImage}
          alt={seller.storeName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-6">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="h-24 w-24 rounded-xl object-cover mx-auto sm:mx-0"
                />
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900">{seller.storeName}</h1>
                  <p className="mt-1 text-gray-500">{seller.storeDescription}</p>
                  <div className="mt-3 flex items-center justify-center sm:justify-start space-x-4">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-5 w-5 fill-current" />
                      <span className="ml-1 font-medium">{seller.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Package className="h-5 w-5" />
                      <span className="ml-1">{seller.totalSales} sales</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-3">
                <button className="btn-primary flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Visit Store
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  Contact Seller
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t">
              <div className="flex items-center text-gray-500">
                <MapPin className="h-5 w-5 mr-2" />
                {seller.location}
              </div>
              <div className="flex items-center text-gray-500">
                <Calendar className="h-5 w-5 mr-2" />
                Joined {seller.joinedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};