import React from 'react';

const OrderModel = ({ setOrdermodel, order }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900 opacity-75"
        onClick={() => setOrdermodel(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg px-6 py-8 sm:w-11/12 md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Details</h2>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Full Name:</span> {order?.shippingAddress?.fullName}</p>
            <p><span className="font-medium">Email:</span> {order?.shippingAddress?.email}</p>
            <p><span className="font-medium">Phone:</span> {order?.shippingAddress?.phone}</p>
            <p><span className="font-medium">City:</span> {order?.shippingAddress?.city}</p>
            <p><span className="font-medium">Zip Code:</span> {order?.shippingAddress?.zipCode}</p>
            <p><span className="font-medium">Address:</span> {order?.shippingAddress?.address}</p>
          </div>
        </div>

        {/* Product Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Product Information</h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Product ID:</span> {order?.products?.productId}</p>
            <p><span className="font-medium">Quantity:</span> {order?.products?.quantity}</p>
            <p><span className="font-medium">Price:</span> ${order?.products?.price}</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
          <div className="text-gray-700">
            <p><span className="font-medium">Payment Method:</span> {order?.paymentMethod}</p>
            <p><span className="font-medium">Payment Status:</span> {order?.paymentStatus}</p>
            <p><span className="font-medium">Total Amount:</span> ${order?.totalAmount}</p>
          </div>
        </div>

        {/* Order Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Order Status</h3>
          <p className={`text-sm px-4 py-2 rounded-full inline-block ${
            order.orderStatus === 'Delivered'
              ? 'bg-green-100 text-green-700'
              : order.orderStatus === 'Processing'
              ? 'bg-yellow-100 text-yellow-700'
              : order.orderStatus === 'Cancelled'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {order.orderStatus}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOrdermodel(false)}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModel;
