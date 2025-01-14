import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Loader = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce200"></div>
    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce400"></div>
  </div>
);

const EditProduct = () => {
  const [files, setFiles] = useState([]);
  const [describtion, setDescribtion] = useState('');
  const [color, setP_color] = useState('');
  const [price, setP_price] = useState('');
  const [name, setP_name] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState('');
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editHighlightIndex, setEditHighlightIndex] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams(); // Get product ID from the URL

  useEffect(() => {
    const fetchProduct = async () => {
        // debugger
      try {
        const response = await axios.get(`https://malboosat-1.onrender.com/product/getproduct/${id}`);
        console.log(response.data.products)
        const product = response.data.products; 
        // Assuming the response contains the product in "product" field
        const lolz=product.highlights
        setFiles(product.P_images);
        setDescribtion(product.productdescribtion);
        setP_color(product.productcolor);  
        setP_price(product.productprice);
        setP_name(product.productname);
    setHighlights(lolz.map(lool=>lool.split(`,`)));
        setPreview(product.P_images);
      } catch (error) {
        console.error('Failed to load product:', error);
        // setError('Failed to load product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (files.length === 0) {
      alert('At least one image is required.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));
    formData.append('productdescribtion', describtion);
    formData.append('productname', name);
    formData.append('productprice', price);
    formData.append('highlights', JSON.stringify(highlights));

    try {
      const res=await axios.post(`https://malboosat-1.onrender.com/seller/editproduct/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    //   alert('Product updated successfully!');
    //   navigate('/product');
    console.log('Product updated successfully!',res.data);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, indexToReplace = null) => {
    const selectedFiles = Array.from(e.target.files);

    if (indexToReplace !== null) {
      const updatedFiles = [...files];
      updatedFiles[indexToReplace] = selectedFiles[0];
      setFiles(updatedFiles);
      const previews = updatedFiles.map((file) => URL.createObjectURL(file));
      setPreview(previews);
    } else {
      setFiles([...files, ...selectedFiles]);
      setPreview([...preview, ...selectedFiles]);
    }
  };

  const handleHighlightChange = (e) => {
    setHighlightInput(e.target.value);
  };

  const handleHighlightAddOrEdit = (e) => {
    if (e.key === 'Enter' && highlightInput.trim() !== '') {
      if (editHighlightIndex !== null) {
        const updatedHighlights = [...highlights];
        updatedHighlights[editHighlightIndex] = highlightInput.trim();
        setHighlights(updatedHighlights);
        setEditHighlightIndex(null);
      } else {
        setHighlights((prev) => [...prev, highlightInput.trim()]);
      }
      setHighlightInput('');
    }
  };

  const handleHighlightDelete = (highlightToDelete) => {
    setHighlights(highlights.filter((highlight) => highlight !== highlightToDelete));
  };

  const handleHighlightEdit = (index) => {
    setHighlightInput(highlights[index]);
    setEditHighlightIndex(index);
  };

  const handleImageRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setPreview(updatedFiles);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl relative">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Product</h2>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Images</label>
          <div className="grid grid-cols-3 gap-4">
            {preview.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index}`}
                  className="object-cover w-full h-32 rounded-lg shadow-lg hover:opacity-80 transition duration-200 cursor-pointer"
                  onClick={() => document.getElementById(`file-input-${index}`).click()}
                />
                <button
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 text-black size-4 p-1 flex justify-center items-center rounded-full bg-gray-50 hover:bg-slate-50"
                >
                  &times;
                </button>
                <input
                  type="file"
                  id={`file-input-${index}`}
                  onChange={(e) => handleFileChange(e, index)}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setP_name(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setP_color(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setP_price(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Description</label>
          <input
            type="text"
            value={describtion}
            onChange={(e) => setDescribtion(e.target.value)}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-3">Product Highlights</label>
          <input
            type="text"
            value={highlightInput}
            onChange={handleHighlightChange}
            onKeyDown={handleHighlightAddOrEdit}
            className="block w-full text-gray-800 border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Press Enter to add or edit highlight"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700"
                onClick={() => handleHighlightEdit(index)}
              >
                {highlight} <span className="ml-2 text-xl">&times;</span>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none"
        >
          Update Product
        </button>

        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-800 rounded-lg">
            <Loader />
          </div>
        )}

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default EditProduct;
