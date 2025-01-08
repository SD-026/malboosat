import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TotalSellers() {
  // Sample seller data
  const [sellers, setSellers] = useState([]);
  
  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/admin/totalsellers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sheeraz lool",response.data.totalsellers)
      setSellers(response.data.totalsellers)
     
    } catch (e) {
      console.error(e);
    }
  };

  const changed=async(e,_id)=>{
    console.log(_id)
    const lool={
      role:e.target.value,
      _id
    }
  
    try {
      const response = await axios.post(`http://localhost:5555/admin/changerole`,lool, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders()
  
    } catch (e) {
      console.error(e);
    }
  }
  
  const removeuser =async(_id)=>{
    // console.log("fuck u",_id)
  
    try {
      const response = await axios.put(`http://localhost:5555/admin/removeuser`,{_id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOrders()
     
    } catch (e) {
      console.error(e);
    }
  }

 
  
  useEffect(() => {
     
  
      fetchOrders();
    }, [token]);
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard - Sellers</h1>
        <p className="text-gray-600">Manage and view all the registered sellers.</p>
      </header>

      {/* Sellers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sellers.map((seller) => (
          (seller.role==='seller'&&
          <div key={seller._id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            {/* Seller Info */}
            <div className="mb-4">
              <div className='flex justify-between'>
              <h2 className="text-xl font-semibold text-gray-800">{seller.username}</h2>
              <div className='flex items-center gap-1'>
                <p className="font-bold text-gray-800">role:</p>


                <select value={seller.role} onChange={(e)=>changed(e,seller._id)}>
                <option value='admin' >Admin</option>
                <option value='seller'>Seller</option>
                <option value='user'>User</option>



                </select>
               
              </div>

              </div>
              
              <p className="text-gray-600">{seller.email}</p>
            </div>
            {/* Stats */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Products:</p>
                <p className="font-bold text-gray-800">{seller.sellerCreated.length}</p>
              </div>
              <div>
                <p className="text-gray-500">Order:</p>
                <p className="font-bold text-gray-800">{seller.order.length}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Rating:</p>
                <p className="font-bold text-yellow-500">{seller.rating} ⭐</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button onClick={()=>removeuser(seller._id)} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
                View Products
              </button>
              <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
                Remove {seller.role}
              </button>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
}

// export default AdminSellersPage;


export default TotalSellers