import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Custom Loader Component
const Loader = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce200"></div>
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce400"></div>
  </div>
);

const S_CreateOrder = () => {
  const [files, setFiles] = useState([]);
  const [describtion, setDescribtion] = useState('');
  const [color, setP_color] = useState('');
  const [price, setP_price] = useState('');
  const [name, setP_name] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false); // Initially false to prevent loader showing on first render
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Handle form submission
  const handle = async () => {
    if (files.length === 0) {
      alert('At least one image is required.');
      return;
    }

    setLoading(true); // Show loader

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    formData.append('productdescribtion', describtion);
    formData.append('productname', name);
    formData.append('productprice', price);
    formData.append('highlights', JSON.stringify(highlights));

    try {
      const res = await axios.post('https://malboosat-1.onrender.com/seller/New_Product', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      // alert('Product added successfully!');
      
      navigate('/S_Home');
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Failed to add product.');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  // Handle highlight input
  const handleHighlightChange = (e) => {
    setHighlightInput(e.target.value);
  };

  // Add highlight when Enter key is pressed
  const handleHighlightAdd = (e) => {
    if (e.key === 'Enter' && highlightInput.trim() !== '') {
      setHighlights((prev) => [...prev, highlightInput.trim()]);
      setHighlightInput(''); // Clear input field
    }
  };

  // Delete highlight
  const handleHighlightDelete = (highlightToDelete) => {
    setHighlights(highlights.filter((highlight) => highlight !== highlightToDelete));
  };

  // Remove image from preview
  const handleImageRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setPreview(updatedFiles.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg relative">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create a New Product</h2>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Choose Images (At least one required)</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/*"
            multiple
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {preview.map((src, index) => (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-32 rounded-lg shadow-lg hover:opacity-80 transition duration-200"
                />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2  right-2   text-black size-4 p-1 flex justify-center items-center rounded-full bg-gray-50 hover:bg-slate-50"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Name Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Name</label>
          <input
            type="text"
            onChange={(e) => setP_name(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Color Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Color</label>
          <input
            type="text"
            onChange={(e) => setP_color(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Product Price Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Price</label>
          <input
            type="text"
            onChange={(e) => setP_price(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Product Description Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Details</label>
          <input
            type="text"
            onChange={(e) => setDescribtion(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Highlights Input */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Highlights</label>
          <input
            type="text"
            value={highlightInput}
            onChange={handleHighlightChange}
            onKeyDown={handleHighlightAdd}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Press Enter to add highlight"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer flex items-center justify-between"
                onClick={() => handleHighlightDelete(highlight)}
              >
                {highlight} <span className="ml-2 text-xl">&times;</span>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handle}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
        >
          Submit Product
        </button>

        {/* Loader */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 rounded-lg">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default S_CreateOrder;
