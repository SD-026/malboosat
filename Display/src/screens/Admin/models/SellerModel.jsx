import React from 'react';

const SellerModel = ({ setSellermodel, seller }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 opacity-75"
        onClick={() => setSellermodel(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg px-6 py-8 sm:w-11/12 md:w-2/3 lg:w-1/2">
        <div className="text-center mb-6">
          {/* Profile Picture */}
          <img
            src={seller.profilePic}
            alt="Seller Profile"
            className="w-24 h-24 mx-auto rounded-full shadow-lg"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center"> {seller.role.charAt(0).toUpperCase() + seller.role.slice(1)} Details</h2>

        {/* Seller Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Username:</span> {seller.username}</p>
            <p><span className="font-medium">Email:</span> {seller.email}</p>
            <p><span className="font-medium">Gender:</span> {seller.gender}</p>
            <p><span className="font-medium">Role:</span> {seller.role}</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Orders Summary</h3>

          {/* Orders Summary List */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-100 rounded shadow-md">
              <p className="text-blue-600 font-semibold">Pending</p>
              <p className="text-xl font-bold">{seller.orders.pending}</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded shadow-md">
              <p className="text-yellow-600 font-semibold">Processing</p>
              <p className="text-xl font-bold">{seller.orders.processing}</p>
            </div>
            <div className="p-4 bg-green-100 rounded shadow-md">
              <p className="text-green-600 font-semibold">Shipped</p>
              <p className="text-xl font-bold">{seller.orders.shipped}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow-md">
              <p className="text-gray-600 font-semibold">Delivered</p>
              <p className="text-xl font-bold">{seller.orders.delivered}</p>
            </div>
            <div className="p-4 bg-red-100 rounded shadow-md col-span-2">
              <p className="text-red-600 font-semibold">Canceled</p>
              <p className="text-xl font-bold">{seller.orders.canceled}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setSellermodel(false)}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerModel;
