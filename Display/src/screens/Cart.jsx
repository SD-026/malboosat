'use client'

import { useState,useEffect,alert } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import image from '../assets/profile.jpg'
import { useNavigate} from 'react-router-dom'

import { useSelector } from'react-redux'




export default function Cart({setOpen}) {
  const [open, setOpened] = useState(true)
  const [data, setData] = useState([])

  const [totalamount, setamount] = useState(0)

  const [TotalPayable, setTotalPrice] = useState()
  const token = localStorage.getItem('token');
  const navigate=useNavigate()

  const {user}=useSelector(store=>store.auth)

  // console.log(user)
  const fetchProduct = async () => {  
    try {
    const response = await axios.get(`http://localhost:1020/user/getcart`,{
           headers: {
            Authorization: `Bearer ${token}`,
        },
      }
        );

      setData(response?.data?.user?.Cart);
      console.log("fuck",response?.data?.user?.Cart);

      // const total = response.data.totalitems.reduce((acc, item) => acc + item.price, 0);
      // setTotalPrice(total.toFixed(2));
    } catch (error) {
      console.error(error);
    }
  };


  const remove= async(_id)=>{
    // console.log(_id)
    const predata={
      P_id:_id,
    }  
    try {
    const response = await axios.post(`http://localhost:1020/user/removefromcart`,predata,{
      headers: {
       Authorization: `Bearer ${token}`,
   },
  });
    
    } catch (error) {
      console.error(error);
    }
    finally{
  fetchProduct()
    }
  }
 

useEffect(() => { 
  fetchProduct()
}, []);

// console.log(totalamount)





// const pretotalpayble=data.reduce((acc, item) => Number(acc) + Number(item.price), 0)
// const totalpayble=pretotalpayble



const CreateOrder=()=>{
  navigate('/checkout')
}
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      {/* <ToastContainer /> */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity  duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        {/* <span className="absolute -inset-0.5" /> */}
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {data?.map((product) => (
                          <li key={product._id} 
                        className="flex py-6">
                          
                                <>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  alt={product?.Cartproduct?.imageAlt}
                                  src={product?.Cartproduct?.P_images[3]}
                                  className="h-full w-full object-cover object-center"
                                  onLoad={() => {
                                    if (product?.Cartproduct?.productprice) {
                                        setamount((mount) => mount + Number(product.Cartproduct.productprice) * Number(product.quantity));
                                    }
                                }} 
                                />
  
                              </div>
                              {/* <div>
                                {product}
                              </div> */}
  
                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{product?.productname}</a>
                                    </h3>
                                    <p className="ml-4" >${product?.Cartproduct.productprice}</p>
                                    
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product?.Cartproduct?.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product?.quantity}</p>
  
                                  <div className="flex">
  
                                    <button onClick={()=>remove(product?.Cartproduct?._id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                              </>

                           
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalamount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button onClick={CreateOrder}>
                    <a
                    
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Create Order
                    </a>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        {/* {TotalPayable} */}
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
