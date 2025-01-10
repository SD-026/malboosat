import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultProfilePic from '../assets/image.jpg'; // Replace with your default image path



const S_Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('/api/users/profile', config);
        setUser(data);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><p className="text-lg font-semibold text-gray-700">Loading...</p></div>;
  if (error) return <div className="flex items-center justify-center h-screen"><p className="text-lg font-semibold text-red-600">{error}</p></div>;

  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-48" style={{ backgroundImage: 'url(https://via.placeholder.com/1500x500)' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <img
            src={user?.profilePic || defaultProfilePic}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-5xl font-extrabold text-white mb-3">{user?.username}</h1>
          <p className="text-xl text-gray-100 italic">{user?.email}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-evenly py-6">
        <div className="text-center">
          <p className="font-semibold text-lg">Orders</p>
          <p className="text-xl animate-pulse">{user?.customerOrders?.length || 0}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Products</p>
          <p className="text-xl animate-pulse">{user?.products?.length || 0}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Ratings</p>
          <p className="text-xl animate-pulse">{user?.rating?.length || 0}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Cart Items</p>
          <p className="text-xl animate-pulse">{user?.cart?.length || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 py-6">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">Edit Profile</button>
        <button className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600">Add Product</button>
        <button className="bg-gray-500 text-white py-2 px-6 rounded-full hover:bg-gray-600">View Orders</button>
      </div>

      {/* Product Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {user?.products?.map((product, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt="Product" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-xl font-bold mt-2">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </div>
    </div>
  );
};

export default S_Profile;


// export default S_Profile