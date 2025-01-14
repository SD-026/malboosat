import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Myorder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const {user}=useSelector(store=>store.auth)

  // Fetching order data from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://malboosat-1.onrender.com/seller/getorderhistory`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
            //  console.log(response.data.orders.custmuerorders)

            //  console.log(response.data.orders.custmuerorders)

        // const dd=response.data.existingProduct
        setOrders(response.data.orders.custmuerorders) 
       
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, [token]);

  const cancelOrder=(_id)=>{
    console.log('cancelling order', _id);
    // confirm()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{user?.username}  Dashboard - Orders</h1>
        {/* <p className="text-gray-600">View customer order requests</p> */}
      </header>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {orders?.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
            {/* Order Details */}
            
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order._id}</h2>
              
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                // alt={product.imageAlt}
                                src={order?.products?.productId?.P_images[3]}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
              <p className="text-gray-600"><span className="font-semibold">Product:</span> {order?.products?.productId?.productname}</p>
         
              <p className="text-gray-600"><span className="font-semibold">Color:</span> {order.color}</p>
              <p className="text-gray-600"><span className="font-semibold">Product Price:</span> { order?.products?.price}</p>  
              <p className="text-gray-600"><span className="font-semibold">Ordered:</span> { order?.products?.quantity}</p>    


              
              <p className="text-gray-600 mt-4 mb-2 ml-2"><span className="font-semibold">Address</span> </p>



              {/* Accessing the nested 'address' object */}
              {order.shippingAddress && (
                <>
               

                  <p className="text-gray-600"><span className="font-semibold">Customer Name:</span> {order.shippingAddress.fullName}</p>  
                  <p className="text-gray-600"><span className="font-semibold">Email:</span> {order?.shippingAddress?.email}</p>
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> {order?.shippingAddress?.address}</p>

                  <p className="text-gray-600"><span className="font-semibold">City:</span> {order?.shippingAddress?.city}</p>
                  <p className="text-gray-600"><span className="font-semibold">ZipCode:</span> {order?.shippingAddress?.zipCode}</p>

                  <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order?.shippingAddress?.phone}</p>

                </>
              )}
                  <p className="text-gray-600"><span className="font-semibold">paymentStatus:</span> {order.paymentStatus}</p>
                  <p className="text-gray-600"><span className="font-semibold">paymentStatus:</span> {order.paymentStatus}</p>
                  <p className="text-gray-600"><span className="font-semibold">orderStatus:</span> {order.orderStatus}</p>
                  {/* <p className="text-gray-600"><span className="font-semibold">totalAmount:</span> {order.totalAmount}</p> */}




           
              <p className="text-gray-500 text-sm">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Order Status */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  order.orderStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.orderStatus  === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">  RS: {order.totalAmount+ 10}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
              <button onClick={(  )=>cancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default RecivedOrder;

export default Myorder