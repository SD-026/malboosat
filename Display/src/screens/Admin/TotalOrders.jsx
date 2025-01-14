import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductModel from './models/PorductModel';
import SellerModel from './models/SellerModel';
import CustomerModel from './models/CustomerModel';
import OrderModel from './models/OrderModel';

function TotalOrders() {
  // Sample order data
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const [filtered, setfiltered] = useState('')
  const [Prodectmodel, setProdectmodel] = useState(false)
  const [ordermodel, setOrdermodel] = useState(false)
  const [customermodel, setCustomermodel] = useState(false)
  const [sellermodel, setSellermodel] = useState(false)

  const [productdata, setProductdata] = useState([])
  const [sellerdata, setsellerdata] = useState([])
  const [customerdata, setCustomerdata] = useState([])
  const [orderdata, setOrderdata] = useState([])






  // Fetching orders data (use a real API in production)
  const fetchDetails = async () => {
    try {
      const res = await axios.get('https://malboosat-1.onrender.com/admin/allusers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data.success) {
      // const userlength =res.data.Total_Users
      // setTotalUser(userlength)
      // setTotalProduct(res.data.Total_Product)
      setOrders(res.data.Total_Orders)
      // setTotal_Completed_Orders(res.data.Total_Completed_Orders)
      // setTotal_pending_Orders(res.data.Total_pending_Orders)        
      // setTotal_Cancelled(res.data.Total_Cancelled)
    }
      // console.log(userlength.length);
      // alert('Product added successfully!');
      
      // navigate('/product');
    } catch (error) {
      console.error('Error uploading product:', error);
      // alert('Failed to add product.');
    } finally {
       // Hide loader
    }
  };
  

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

  const handle_product=async(_id)=>{   
    const id=_id

      try {
        const response = await axios.get(`https://malboosat-1.onrender.com/product/getproduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("sheeraz",response.data.products)
      if (response.data.messages) {
      // setOrders(response.data.list)
    setProductdata(response.data.products)
    setProdectmodel(true)
      }

     
    } catch (e) {
      console.error(e);
    }
  }

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
  const handle_customer=async(_id)=>{
    const id=_id

      try {
        const response = await axios.get(`https://malboosat-1.onrender.com/admin/getcustomer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("sheeraz",response.data)
      if (response.data.success) {
        setCustomerdata(response.data.user)
    setCustomermodel(true)
      }

     
    } catch (e) {
      console.error(e);
    }
  }
  const handle_Order=async(_id)=>{
    const id=_id

    try {
      const response = await axios.get(`https://malboosat-1.onrender.com/admin/getorder/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("sheeraz",response.data)
    if (response.data.success) {
      setOrderdata(response.data.order)
  setOrdermodel(true)
    }

   
  } catch (e) {
    console.error(e);
  }
  }
  useEffect(() => {
    fetchDetails()
  }, [token]);


const get_filter_value=orders.filter((item)=>item.orderStatus===`${filtered===''?item.orderStatus:filtered}`)

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard - Orders</h1>
        <p className="text-gray-600">List of all received orders</p>
        
      </header>
      <div></div>
      <div className='flex justify-between items-center my-3'>
      <div >
        <button onClick={()=>deleteall} className="bg-red-500 max-md:text-[10px] text-nowrap hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Delete All</button>
      </div>

      <div className='flex max-lg:flex-col gap-x-6 border rounded-lg border-black px-2 py-2 '>


      <h3 className=' text-gray-700 text-sm max-md:text-[10px] text-nowrap'>Total Orders: {orders.length}</h3>
      <h3 className=' text-gray-700 text-sm max-md:text-[10px] text-nowrap'>Total Completed Orders: {orders.length}</h3>
      <h3 className=' text-gray-700 text-sm max-md:text-[10px] text-nowrap'>Total Pending Orders: {orders.length}</h3>
      </div>
      <div className=' gap-x-6'>
        <select  className='px-3 w-full py-1 rounded-xl text-xs   max-md:text-[10px]' onChange={(e)=>setfiltered(e.target.value)}>
          <option defaultChecked  value="">All</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>


        </select>
      </div>
      
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Order ID</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Customer</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Seller</th>

              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Product</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Date</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm ">Total Amount</th>
              <th className="py-2 px-4 text-left font-medium text-gray-600 text-sm " >Status</th>
              
            </tr>
          </thead>
          <tbody >
            {get_filter_value?.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4 text-gray-700 text-sm  cursor-pointer hover:text-blue-700 " onClick={()=>{handle_Order(order?._id)}}>{order?._id}</td>
                <td className="py-2 px-4 text-gray-700 text-sm  cursor-pointer hover:text-blue-700 " onClick={()=>{handle_customer(order?.customerId)}}>{order?.customerId} </td>
                <td className="py-2 px-4 text-gray-700 text-sm   cursor-pointer hover:text-blue-700" onClick={()=>{handle_seller(order?.sellerId)}}>{order?.sellerId} </td>

                <td className="py-2 px-4 text-gray-700 text-sm  cursor-pointer hover:text-blue-700" onClick={()=>{handle_product(order?.products?.productId)}}>{order?.products?.productId}</td>
                <td className="py-2 px-4 text-gray-700 text-sm ">{new Date(order.createdAt).toLocaleDateString()}</td>

                <td className="py-2 px-4 text-gray-700 flex text-sm ">${order?.totalAmount}</td>
                {/* <td className="py-2 px-4 text-gray-700 flex">${order.Products.map((lol)=>(<div>{Number(lol.price)+10}</div>))}</td> */}
                <td className="py-2 px-4 text-gray-700"> <span
                className={` px-3 py-1 rounded-full text-sm font-medium ${
                  order.orderStatus === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : order.orderStatus  === 'Shipped'
                    ? 'bg-blue-100 text-blue-800'
                    :  order.orderStatus  === 'Processing'
                    ? 'bg-green-100 text-blue-800'
                    :  order.orderStatus  === 'Cancelled'
                    ? 'bg-red-100 text-blue-800':
                    'bg-green-100 text-green-800'
                }`}
              >
                {order.orderStatus}
                  
              </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        Prodectmodel&& <ProductModel product={productdata} setProdectmodel={()=>setProdectmodel(!Prodectmodel)}/>
      }
      {
        sellermodel&& <SellerModel seller={sellerdata} setSellermodel={()=>setSellermodel(!sellermodel)} />
      }
      {
        customermodel&& <CustomerModel customer={customerdata}  setCustomermodel={()=>setCustomermodel(!customermodel)}/>
      }
      {
        ordermodel&& <OrderModel order={orderdata} setOrdermodel={()=>setOrdermodel(!ordermodel)} />
      }
    </div>
  );
}

// export default AdminOrdersPage;


export default TotalOrders