import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
// import Cart from './Cart';
import axios from 'axios';
import image from '../../assets/profile.jpg'




const Home = () => {
  const [data, setData] = useState([])
  
 


  useEffect(() => {
    const fetch = async () => {
  
      try{
          const response = await axios.get(`http://localhost:5555/api/products`)
          setData(response.data.addproduct)  
      }
      catch(e){
          console.error(e);
      }
  }
  fetch()
  }, []);


  const navigate = useNavigate();

 

  
    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
    
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data.map((product) => (
                <Link to={`/SingleProduct/${product._id}`}>
                <div key={product.id} className="group relative" >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.imageAlt}
                      src={`http://localhost:5555/${product.image}`}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.productname}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
                </Link>

              ))}
            </div>
          </div>
        </div>

        </>
      )
}

export default Home