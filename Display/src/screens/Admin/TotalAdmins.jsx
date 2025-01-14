import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SellerModel from './models/SellerModel';

function TotalAdmins() {
  // Sample seller data
  const [admin, setadmin] = useState([]);
    const [sellerdata, setsellerdata] = useState([])
    const [sellermodel, setSellermodel] = useState(false)
  
  
  const token = localStorage.getItem('token');

  // Fetching sellers data (use a real API in production)

  const fetch_admin = async () => {
    try {
      const res = await axios.get('https://malboosat-1.onrender.com/admin/totaladmins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)

      if(res.data.success) {
        console.log(res.data.Total_Amins)

        setadmin(res.data.Total_Amins)
    }}catch (e) {
      console.error(e);
    }
  };
 
  const changed=async(e,_id)=>{
    console.log(_id)
    const data={
      role:e.target.value,
      userID:_id
    }
  
    try {
      const response = await axios.post(`https://malboosat-1.onrender.com/admin/changerole`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data.message);
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
                 )
      
          }
    

    } catch (e) {
      console.error(e);
    }finally{
      fetch_admin()

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

    // fetchOrders()


   
  } catch (e) {
    console.error(e);
  }
}
const fetchOrders = async () => {
  try {
    const response = await axios.get(`http://localhost:5555/admin/totalsellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("sheeraz lo",response.data.totalsellers)
    setSellers(response.data.totalsellers)
   
  } catch (e) {
    console.error(e);
  }
};




useEffect(() => {
  fetch_admin()
  

    // fetchOrders();

  }, [token]);

  const handle_seller=async(_id)=>{
    const id=_id

      try {
        const response = await axios.get(`https://malboosat-1.onrender.com/admin/getseller/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("sheeraz",response.data)
      if (response.data.success) {
        setsellerdata(response.data.seller)
    setSellermodel(true)
      }

     
    } catch (e) {
      console.error(e);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard - Admin</h1>
        <p className="text-gray-600">Manage and view all the registered Admin.</p>
      </header>

      {/* Sellers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {admin?.map((seller) => (
          // (admin.role==='admin'&&
          <div key={seller._id} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
            {/* Seller Info */}
            <div className="mb-4">
              <div className='flex justify-between'>
              <h2 className="text-xl font-semibold text-gray-800">{seller.username}</h2>
              <div className='flex items-center gap-1'>
                <p className="font-bold text-gray-800">role:</p>


                <select value={seller.role} defaultValue={seller.role} onChange={(e)=>changed(e,seller._id)}>

                <option value='admin'>Admin</option>
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
                <p className="font-bold text-gray-800">{seller?.products?.length}</p>
              </div>
              <div>
                <p className="text-gray-500">Order:</p>
                <p className="font-bold text-gray-800">{seller?.sellersorders?.length}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Rating:</p>
                <p className="font-bold text-yellow-500">{seller?.rating} ⭐</p>
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button onClick={()=>handle_seller(seller._id)} className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
                View Admin
              </button>
              <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md">
              Remove {seller.role}
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        sellermodel&&
        <SellerModel seller={sellerdata} setSellermodel={()=>setSellermodel(!sellermodel)}/>

      }
    </div>
  );
}

// export default AdminSellersPage;


// export default TotalSellers


// export default TotalCustomers

export default TotalAdmins