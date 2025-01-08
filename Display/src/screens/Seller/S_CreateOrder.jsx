import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const S_CreateOrder = () => {
  const [files, setFiles] = useState([]); // To store multiple files
  const [describtion, setDescribtion] = useState('');
  const [color, setP_color] = useState('');
  const [price, setP_price] = useState('');
  const [name, setP_name] = useState('');
  const [preview, setPreview] = useState([]); // To store previews of all images
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handle = async () => {
    if (files.length === 0) {
      alert('At least one image is required.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file)); // Append multiple images
    formData.append('productdescribtion', describtion);
    formData.append('productname', name);
    formData.append('productprice', price);

    try {
      const res = await axios.post('http://localhost:1020/seller/New_Product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to add product.');
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles); // Store the selected files

    // Generate preview for each selected file
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
        
        {/* File Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Choose Images (One Required)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded-lg"
            accept="image/*"
            multiple // Allow multiple file selection
          />
          {/* Image Previews */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {preview.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} className="object-cover w-full h-32 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Name Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            onChange={(e) => setP_name(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        {/* Product Color Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Product Color</label>
          <input
            type="text"
            onChange={(e) => setP_color(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Product Price Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Price</label>
          <input
            type="text"
            onChange={(e) => setP_price(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
            required
          />
        </div>

        {/* Product Description Input */}
        <div className="flex flex-col mb-4">
          <label className="text-gray-700 mb-2">Product Details</label>
          <input
            type="text"
            onChange={(e) => setDescribtion(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handle}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default S_CreateOrder;
