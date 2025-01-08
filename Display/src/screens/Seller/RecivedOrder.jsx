import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecivedOrder() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem('token');

  // Fetching order data from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/seller/S_Recived`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.existingProduct); 
        // Assuming 'existingProduct' is your orders array
        // console.log(response.data.existingProduct.find(pro=>
        //   pro.address
        // ))
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Seller Dashboard - Orders</h1>
        <p className="text-gray-600">View customer order requests</p>
      </header>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            {/* Order Details */}
            
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h2>
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                // alt={product.imageAlt}
                                src={`http://localhost:5555/${order.image}`}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
              <p className="text-gray-600"><span className="font-semibold">Product:</span> {order.productname}</p>
              <p className="text-gray-600"><span className="font-semibold">Color:</span> {order.color}</p>
              <p className="text-gray-600 mt-4 mb-2 ml-2"><span className="font-semibold">Address</span> </p>



              {/* Accessing the nested 'address' object */}
              {order.address && (
                <>
               

                  <p className="text-gray-600"><span className="font-semibold">Customer Name:</span> {order.address.fullName}</p>
                  <p className="text-gray-600"><span className="font-semibold">City:</span> {order.address.city}</p>
                  <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.address.phone}</p>
                </>
              )}
              <p className="text-gray-500 text-sm">Date: {new Date(order.updatedAt).toLocaleDateString()}</p>
            </div>

            {/* Order Status */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.status  === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">  ${Number(order.price) + 10}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecivedOrder;
