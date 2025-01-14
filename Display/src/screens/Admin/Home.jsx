import React ,{useEffect, useState}from 'react';
import { Users, Package, DollarSign, TrendingUp, ListOrdered ,GitPullRequestClosed ,BookOpenCheck  } from 'lucide-react';
import axios from 'axios';

export default function Home (){
  const token=localStorage.getItem('token');
  const [totalUser, setTotalUser] = useState([])
  const [totalProduct, setTotalProduct] = useState([])
  const [total_orders, setTotal_Orders] = useState([])
  const [total_completed_orders, setTotal_Completed_Orders] = useState([])
  const [total_pending_orders, setTotal_pending_Orders] = useState([])
  const [total_cancelled, setTotal_Cancelled] = useState([])
  
  const [all_sellers, setAll_Sellers] = useState([])
  const [topsellers, setTop_Sellers] = useState([])


  // const [total_pending_returned, setTotal_pending_returned] = useState([])

  const fetchDetails = async () => {
    try {
      const res = await axios.get('https://malboosat-1.onrender.com/admin/allusers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data.success) {
      const userlength =res.data.Total_Users
      setTotalUser(userlength)
      setTotalProduct(res.data.Total_Product)
      setTotal_Orders(res.data.Total_Orders)
      setTotal_Completed_Orders(res.data.Total_Completed_Orders)
      setTotal_pending_Orders(res.data.Total_pending_Orders)        
      setTotal_Cancelled(res.data.Total_Cancelled)
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
  const fetchsellers = async () => {
    try {
      const res = await axios.get('https://malboosat-1.onrender.com/admin/topsellers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(res.data.success) {
    //  console.log(res.data.Top_Sellers)
     setAll_Sellers(res.data.Total_Sellers)
     setTop_Sellers(res.data.Top_Sellers)
      
    }
      // console.log(userlength.length);
      // alert('Product added successfully!');
      
      // navigate('/product');
    } catch (error) {
      console.error('Error uploading product:', error);
      // alert('Failed to add product.');
    } finally {
       // Hide loader
       fetchDetails()
    }
  };

  useEffect(() => {
    fetchDetails()
    fetchsellers()
  }, []);
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Total Users"
          value={totalUser?.length||0}
        />
         <DashboardCard
          icon={<Users className="h-8 w-8 text-blue-500" />}
          title="Total Sellers"
          value={all_sellers?.length||0}
        />
        <DashboardCard
          icon={<Package className="h-8 w-8 text-green-500" />}
          title="Products"
          value={totalProduct.length||0}
        />
        <DashboardCard
          icon={<DollarSign className="h-8 w-8 text-yellow-500" />}
          title="Revenue"
          value="$12,345"
        />
        <DashboardCard
          icon={<ListOrdered className="h-8 w-8 text-purple-500" />}
          title="Total Orders"
          value={total_orders?.length}
        />
         <DashboardCard
          icon={<BookOpenCheck  className="h-8 w-8 text-purple-500" />}
          title="Total Completed"
          value={total_completed_orders?.length}
        /> <DashboardCard
        icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
        title="Total Pending"
        value={total_pending_orders.length}
      /> <DashboardCard
      icon={<GitPullRequestClosed className="h-8 w-8 text-purple-500" />}
      title="Total Cancelled Orders"
      value={total_cancelled.length}
    /> <DashboardCard
    icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
    title="Growth"
    value="+23%"
  /> <DashboardCard
  icon={<TrendingUp className="h-8 w-8 text-purple-500" />}
  title="Growth"
  value="+23%"
/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopSellers data={topsellers} />
      </div>
    </div>
  );
};

const DashboardCard =({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      {icon}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const RecentOrders= () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="font-medium">Order #{order}23456</p>
            <p className="text-sm text-gray-500">2 items • $199.99</p>
          </div>
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
            Completed
          </span>
        </div>
      ))}
    </div>
  </div>
);

const TopSellers = ({data}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Top Sellers</h2>
    <div className="space-y-4">
      {data?.map((seller) => (
        <div key={seller._id} className="flex items-center space-x-4 border-b pb-4">
          <img
            src={seller?.profilePic}
            alt={`Seller ${seller}`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium"> {seller.username.charAt(0).toUpperCase() + seller.username.slice(1)}</p>
            <p className="text-sm text-gray-500"> ${seller.sellersorders.reduce((total, item) => total + item.totalAmount, 0)} sales</p>
          </div>
          <span className="text-sm font-medium text-blue-600">View</span>
        </div>
      ))}
    </div>
  </div>
);