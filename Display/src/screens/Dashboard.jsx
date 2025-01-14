import React,{useState,useEffect} from 'react'
import Cart from './Cart';


import { TiShoppingCart } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductFetch from '../hooks/ProductFetch';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import logo from '../assets/Z_logo.png'
import { current } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/authSlice';

const navigationuser = [
  { name: 'Home', href: '/', current: true },
  { name: 'Team', href: 'Ourteam', current: false },
  { name: 'Our Collectios', href: 'collections', current: false },
  { name: 'My Orders', href: 'myorders', current: false },
]

const navigationadmin = [
  { name: 'Home', href: '/', current: true },
  { name: 'My   Sellers Team', href: 'Ourteam', current: false },
  { name: 'Collectios', href: 'collections', current: false },
  // { name: 'My Orders', href: 'myorders', current: false },
]
const navigationseller = [
  { name: 'Home', href: '/', current: true },
  { name: 'OurTeam', href: 'Ourteam', current: false },
  { name: 'Our Collectios', href: 'collections', current: false },
  { name: 'My Orders', href: 'myorders', current: false },

]


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
const Dashboard = ({children}) => {
  

  const [Open, setOpened] = useState(false)
 
  const navigate=useNavigate()
  const token = localStorage.getItem('token');
  const dispatch=useDispatch()
  // const {user}=useSelector(store=>store.auth)
  const [currented, setCurrent] = useState({
    name:'',
    currentpage:false
  })
  const {user}=useSelector(store=>store.auth)

  const signOut=()=>{
    
    localStorage.removeItem('token')
    dispatch(setAuthUser(null))
    

    navigate('/')
  }



  return (
    <div>
 
    <Disclosure as="nav" className=" backdrop-blur-md  w-full bg-white/10 shadow-md left-0 fixed right-0   z-30">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center gap-x-1 cursor-pointer" onClick={()=>{
              navigate('/')
            }}>
              <img
                alt="Malosaat"
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYnZxSLl6GMgShr-hEMUbvu4p2WhAhDp7vJA&s"}
                className="h-8  rounded-full w-auto"
              />
              <h2 className='text-gray-900 rounded-md px-3 py-2 text-sm font-medium'>Malboosat</h2>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {(user?.role==='admin'?navigationadmin:user?.role==='seller'?navigationseller:navigationuser).map((item) => (
                  <a
                    key={item.name}
                    // href={item.href}
                    onClick={()=>{
                      navigate(`/${item.href}`)
                      setCurrent({name:item.name,currentpage: true})
                    }}
                    aria-current={currented.name===item.name&&currented.currentpage===true ? 'page' : undefined}
                    className={classNames(
                     currented.name===item.name&&currented.currentpage===true? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              onClick={()=>{
                setOpened(!Open)
              }}
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <TiShoppingCart aria-hidden="true" className="size-6"  />
            </button>

            {/* Profile dropdown */}

            <Menu as="div" className="relative ml-3">
              {user ?(<>
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user?.profilePic}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
             
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                
                <MenuItem >
                  <a
                  onClick={()=>{
                    navigate('/profile')
                  }}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    Your Profile
                  </a>
                </MenuItem>
               
                <MenuItem>
                  <a
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    onClick={()=>{
                      signOut()
                    }}
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems></>):(
                 <button
                 type="button"
                 onClick={()=>{
                  //  setOpened(!Open)
                  navigate('/login')
                 }}
                 className="relative rounded-full  p-1 text-gray-700 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
               >
                 <span className="absolute -inset-1.5" />
                 <span className="sr-only">View notifications</span>
                 {/* <TiShoppingCart aria-hidden="true" className="size-6"  /> */}
                 
                  Login
                 
               </button>  
                
              )}
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {(user?.role==='admin'?navigationadmin:user?.role==='seller'?navigationseller:navigationuser).map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  



<div
className={`pt-6`}
>

   {children}

   </div>

   {Open && <Cart setOpen={()=>setOpened(false)}/>}






   </div>
  )
}

export default Dashboard