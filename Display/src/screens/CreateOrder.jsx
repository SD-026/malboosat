import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Quantaty, setQuantity] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://malboosat-1.onrender.com/user/placeorder`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setFormData('')


     console.log(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://malboosat-1.onrender.com/user/getcart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response?.data?.user?.Cart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const updateQuantity =async (id, delta) => {
    setData((prevData) =>
      prevData.map((product) =>
        product._id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity + delta),

            }
          : product
      )

    );
    if(delta===+1){
      console.log("plue")
      

      const predata = { P_id:id,quantity: "plus" };
      // console.log(id)
    try {
      const res =await axios.post(`https://malboosat-1.onrender.com/user/updatecart`, predata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res)

    } catch (error) {
      console.error(error);
    }finally{
    fetchProduct();

    }
      // console.log("plus",Quantaty)

    }else{
      const predata = { P_id:id,quantity: "minus" };
      // console.log(id)
    try {
      await axios.post(`https://malboosat-1.onrender.com/user/updatecart`, predata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }finally{
    fetchProduct();

    }
      
    }

  };

  useEffect(() => {
    const total = data.reduce(
      (acc, product) => acc + product.Cartproduct.productprice * product.quantity,
      0
    );
    setTotalAmount(total);
  }, [data]);

  const remove = async (_id) => {
    const predata = { P_id: _id };
    try {
      await axios.post(`https://malboosat-1.onrender.com/user/removefromcart`, predata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProduct();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Order</h1>

      <div className="border-b border-gray-300 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Cart</h2>

        <ul className="space-y-4">
          {data?.map((product) => (
            <li key={product._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
              <div className="flex items-center">
                <img
                  alt={product.imageAlt}
                  src={product?.Cartproduct?.P_images[3]||product?.Cartproduct?.P_images[2]||product?.Cartproduct?.P_images[1]||product?.Cartproduct?.P_images[1]}
                  className="h-20 w-20 rounded-lg object-cover mr-4"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{product?.productname}</h3>
                  <p className="text-sm text-gray-500">Rs: {product?.Cartproduct?.productprice}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(product?.Cartproduct?._id, -1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg font-medium">{product?.quantity}</span>
                <button
                  onClick={() => updateQuantity(product?.Cartproduct?._id, +1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => remove(product?.Cartproduct?._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-right">
          <p className="text-lg font-semibold text-gray-800">Subtotal: Rs: {totalAmount}</p>
          <p className="text-lg font-semibold text-gray-800">Shipping Fees: Rs: 10</p>
          <p className="text-xl font-bold text-gray-900">Total Payable: Rs: {totalAmount + 10}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="123-456-7890"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 Main St"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 Main St"
              required
            />
          </div><div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              ZipCode
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 Main St"
              required
            />
          </div>
          
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button

          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Place Order


        </button>
      </form>


    </div>
  );
}

// export default OrderForm;


export default CreateOrder