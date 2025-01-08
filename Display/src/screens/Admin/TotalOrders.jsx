import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TotalOrders() {
  // Sample order data
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');


  // Fetching orders data (use a real API in production)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/admin/adminlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("sheeraz",response.data)
        setOrders(response.data.list)
       
      } catch (e) {
        console.error(e);
      }
    };

    fetchOrders();
  }, [token]);

  const deleteall = async()=>{

    try {
      const response = await axios.delete(`http://localhost:5555/admin/deleteall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("sheeraz",response.data)
      setOrders(response.data.list)
     
    } catch (e) {
      console.error(e);
    }

  }
const status ='Shippd'

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard - Orders</h1>
        <p className="text-gray-600">List of all received orders</p>
      </header>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Order ID</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Customer</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Products</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Date</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600">Total Amount</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600" >Status</th>
              
            </tr>
          </thead>
          <tbody >
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4 text-gray-700">{order._id}</td>
                <td className="py-2 px-4 text-gray-700">{order.Customer} </td>
                <td className="py-2 px-4 text-gray-700">{order.Products.map((lol)=>(<div>{lol.productname}</div>))}</td>
                <td className="py-2 px-4 text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>

                <td className="py-2 px-4 text-gray-700 flex">${order.Products.map((lol)=>(<div>{Number(lol.price)+10}</div>))}</td>
                {/* <td className="py-2 px-4 text-gray-700 flex">${order.Products.map((lol)=>(<div>{Number(lol.price)+10}</div>))}</td> */}
                <td className="py-2 px-4 text-gray-700"> <span
                className={` px-3 py-1 rounded-full text-sm font-medium ${
                status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : status  === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                  {status}
              </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// export default AdminOrdersPage;


export default TotalOrders