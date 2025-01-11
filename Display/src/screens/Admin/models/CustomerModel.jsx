import React from 'react';

const CustomerModel = ({ setCustomermodel, customer }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 opacity-75"
        onClick={() => setCustomermodel(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg px-6 py-8 sm:w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Customer Details</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src={customer.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Username:</span> {customer.username}</p>
            <p><span className="font-medium">Email:</span> {customer.email}</p>
            <p><span className="font-medium">Gender:</span> {customer.gender}</p>
            <p><span className="font-medium">Role:</span> {customer.role}</p>
          </div>
        </div>

        {/* Orders Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Orders</h3>
          <p className="text-gray-700">
            <span className="font-medium">Customer Orders:</span> {customer.custmuerorders.length}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Seller Orders:</span> {customer.sellersorders.length}
          </p>
        </div>

        {/* Products Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          <p className="text-gray-700">
            <span className="font-medium">Total Products:</span> {customer.products.length}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setCustomermodel(false)}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModel;
