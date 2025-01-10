import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import defaultProfilePic from '../assets/image.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const changeProfilePicture = useRef(null)
  const navigate=useNavigate()
  // useRef

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.get('/api/users/profile', config);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!newProfilePic) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('profilePic', newProfilePic);

    try {
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      await axios.put('/api/users/profile-pic', formData, config);
      alert('Profile picture updated successfully!');
      window.location.reload(); // Reload to fetch updated profile pic
    } catch (err) {
      console.error('Failed to upload profile picture:', err);
      alert('Failed to update profile picture. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-4xl  px-20 bg-gray-300   p-10 mx-20 my-5 text-gray-800 rounded-3xl">
      <div className="flex items-center gap-10">
        <img
          src={preview|| user?.profilePic || defaultProfilePic}
          alt="Profile"
          className="w-40 h-40  rounded-full border-8  border-white shadow-lg   object-center "
          onClick={() =>{
            changeProfilePicture.current.click();
            
          }}
        />

        <div>
          <h1 className="text-4xl font-extrabold mb-3">{user?.username}</h1>
          <p className="text-xl font-light italic">{user?.email}</p>
          <p className="mt-3 text-md font-medium">
            Role:{' '}
            <span className="capitalize bg-white text-pink-500 px-3 py-1 rounded-full shadow-sm">
              {user?.role}
            </span>
          </p>
          <p className="mt-3 text-md font-medium">
            Gender:{' '}
            <span className="capitalize bg-white text-yellow-500 px-3 py-1 rounded-full shadow-sm">
              {user?.gender}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6">
        {/* <label className="block text-lg font-medium mb-3">Change Profile Picture</label> */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={changeProfilePicture}

          className="w-full hidden text-gray-800 border border-gray-300 p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover"
            />
          </div>
        )} */}
        {preview &&
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={` ml-6 px-8 py-3 font-bold rounded-full shadow-lg transition-all duration-300 ${
            uploading
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
              : 'bg-white text-pink-500 hover:bg-gray-100'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        }
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 bg-white text-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
        onClick={()=>{
          navigate('/myorders')
        }}>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <p className="text-xl font-semibold">{user?.custmuerorders?.length || 0} orders placed</p>
        </div>

        <div className="p-8 bg-white text-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <p className="text-xl font-semibold">{user?.products?.length || 0} products listed</p>
        </div>

        <div className="p-8 bg-white text-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold mb-4">Rating</h2>
          <p className="text-xl font-semibold">{user?.rating?.length || 0} ratings received</p>
        </div>

        <div className="p-8 bg-white text-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
          <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
          <p className="text-xl font-semibold">{user?.Cart?.length || 0} items in cart</p>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button className="px-8 py-3 bg-white text-pink-500 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
