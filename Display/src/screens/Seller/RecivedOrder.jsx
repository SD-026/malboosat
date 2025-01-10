import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecivedOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const [status, setStatus] = useState('');
  // setStatus

  // Fetching order data from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:1020/seller/getorderhistory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
          //  console.log(response.data.orders.custmuerorders)
          //  console.log(response.data)
      // const dd=response.data.existingProduct
      setOrders(response.data.orders.sellersorders) 
     
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {

    fetchOrders();
  }, [token]);

  const handelStatus=async({e,order})=>{
    
    console.log('cancelling order', order._id,e.target.value);
    const data={
     
      orderID:order._id, 
      status:e.target.value
    }
    try {
      const response = await axios.post(`http://localhost:1020/seller/updatestatus`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      if (response?.data?.sucess){
              toast.success(response?.data?.message,
                  { position: 'bottom-right',
                   autoClose: 1000,
                   // hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   }
                 )
          }
          else{
              toast.warn(response?.data?.message,
                  { position: 'bottom-right',
                   autoClose: 1000,
                   // hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   }
                  )}

          //  console.log(response.data.orders.custmuerorders)
          //  console.log(response.data)
      // const dd=response.data.existingProduct
      // setOrders(response.data.orders.sellersorders) 
     
    } catch (e) {
      console.error(e);
    }finally{
    fetchOrders();

    }


    // confirm()
  }


  

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Username Recived Dashboard - Orders</h1>
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
               
                  <img src={order}/>
                  <p className="text-gray-600"><span className="font-semibold">Full Name:</span> {order.shippingAddress.fullName}</p>
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
            <div className="mb-4 flex justify-between ">
            <p className="text-gray-600"><span className="font-semibold">Change Order Status:</span></p>

              
              <select onChange={(e)=>{
                setStatus(e.target.value)
                handelStatus({e,order})
                
              
              }} value={order.orderStatus} className='w-2/4 border border-none  active:border-none focus:border-none flex  items-center text-center text-gray-600'>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-700">  RS: {order.totalAmount+ 10}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Details
              </button>
              <button onClick={()=>cancelOrder(order._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Reject Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default RecivedOrder;

export default RecivedOrder