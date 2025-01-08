import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [data, setData] = useState(null); // Single product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const token = localStorage.getItem('token');


  const AddtoCart = async() => {
    console.log(`added to cart!`);
    const predata={
      P_id:id,

    }
    try {

      const response = await axios.post(`http://localhost:1020/user/addtocart`,predata,{
        headers: {
         Authorization: `Bearer ${token}`,
     },
    });
      console.log(response.data.message)
      toast.warn(response.data.message)


      // setData(response.data.singleproduct); // Assuming single product comes in the "singleproduct" field
      // setLoading(false); // Turn off loading
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:1020/product/getproduct/${id}`);
        setData(response.data.products); // Assuming single product comes in the "singleproduct" field
        setLoading(false); // Turn off loading
      } catch (error) {
        console.error(error);
        setError('Failed to load product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id,AddtoCart]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No product found</div>;

  return (
    <div className="bg-white">
      <ToastContainer />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Product Details</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div key={data._id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                alt={data.imageAlt || "Product image"}
                src={`http://localhost:5555/${data.image}`|| 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={data.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {data.productname || "Unnamed product"}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{data.color || "No color specified"}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">${data.price || "No price available"}</p>
            </div>
           
          </div>

          
        </div>
        <button 
              className="mt-4 text-sm w-auto p-3 font-semibold py-2 rounded-3xl bg-orange-300"
              onClick={(data) => AddtoCart(data)}
            >
              Add to cart
            </button>
      </div>
    </div>
  );
};

export default SingleProduct;
