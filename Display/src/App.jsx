import { useState,useEffect } from 'react'

// import './App.css'
import { Routes,Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './screens/MainLayout';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import AllProduct from './screens/AllProduct';
import SingleProduct from './screens/SingleProduct';

import Register from './screens/Register'
import S_CreateOrder from './screens/Seller/S_CreateOrder';
import Product from './screens/Product';
import SummerCollections from './screens/collections/SummerCollections';
import CreateOrder from './screens/CreateOrder';
import MeetOurTopSellers from './screens/auth/MeetOurTopSellers';
import Myorder from './screens/Myorder';
import Middleware from './screens/auth/Middleware';
import Profile from './screens/Profile'
import S_Feedback from './screens/Seller/S_Feedback'
import Feedback from './screens/Feedback'
import RecivedOrder from './screens/Seller/RecivedOrder';
import S_Home from './screens/Seller/S_Home';
import S_SingleProduct from './screens/Seller/S_SingleProduct';
import EditProduct from './screens/Seller/EditProduct';

import Home from './screens/Admin/Home';
import TotalSellers from './screens/Admin/TotalSellers';
import TotalAdmins from './screens/Admin/TotalAdmins';
import TotalCustomers from './screens/Admin/TotalCustomers';
import TotalOrders from './screens/Admin/TotalOrders'
import CreateCollection from './screens/Admin/CreateCollection';
const browserRouter = createBrowserRouter([
  {
    
    path: "/",
    element: <MainLayout/>,
  
    children: [

      { path: "/", element:<Dashboard><AllProduct/></Dashboard>},
      { path: "SingleProduct/:id", element: <Dashboard><SingleProduct/></Dashboard> },
      { path: "/product/:id", element: <Dashboard><Product/></Dashboard> },
      { path: "/collections", element: <Dashboard><SummerCollections/></Dashboard> },
      { path: "/checkout", element: <Dashboard><CreateOrder/></Dashboard> },
      { path: "/Ourteam", element: <Dashboard><MeetOurTopSellers/></Dashboard> },
      { path: "/myorders", element: <Dashboard><Myorder/></Dashboard> },
      { path: "/profile", element: <Dashboard><Profile/></Dashboard> },
      { path: "/sendfeedback", element: <Dashboard><Feedback/></Dashboard> },


      //seller routers
      { path: "/CreateProduct", element: <Dashboard><S_CreateOrder/></Dashboard> },
      { path: "/userfeedback", element: <Dashboard><S_Feedback/></Dashboard> },
      { path: "/S_RecivedOrder", element: <Dashboard><RecivedOrder/></Dashboard> },
      { path: "/S_Home", element: <Dashboard><S_Home/></Dashboard> },
      { path: "/S_Product/:id", element: <Dashboard><S_SingleProduct/></Dashboard> },
      { path: "/Edit/:id", element: <Dashboard><EditProduct/></Dashboard> },


      //Admin routes
      { path: "/A_Home", element: <Dashboard><Home/></Dashboard> },
      { path: "/A_totalsellers", element: <Dashboard><TotalSellers/></Dashboard> },
      { path: "/A_Totaladmins", element: <Dashboard><TotalAdmins/></Dashboard> },
      { path: "/A_totalcustomer", element: <Dashboard><TotalCustomers/></Dashboard> },
      { path: "/A_totalOrders", element: <Dashboard><TotalOrders/></Dashboard> },
      { path: "/A_Createcollection", element: <Dashboard><CreateCollection/></Dashboard> },


   
    ],
  },
  { path: "/login", element: <Login /> },
  // { path: "/login", element: <Signin /> },
  { path: "/signup", element: <Register /> },
]);


function App() {
  // ProductFetch()
  // const [count, setCount] = useState(0)
  // const {user}=useSelector(store=>store.auth)
  // const {socket}=useSelector(store=>store.socketio)
  // const dispatch =useDispatch()
  // // console.log(user)
  // useEffect(() => {
  //   if(user){
  //     const socket = io('http://localhost:9000',{
  //       query:{
  //         userID: user._id,
  //         username:user.username
  //       },
  //       transports:['websocket']
  //     });
  //     dispatch(setSocket(socket))


  //     socket.on('getOnLineUsers',(onlineusers)=>{
  //       // console.log('getOnLineUsers',onlineusers)
  //       dispatch(setOnLineUsers(onlineusers))
  //     })

  //     socket.on('notification',(notification)=>{
  //       dispatch(setlikenotification(notification))
  //     })


  //     return()=>{
  //       socket.close()
  //     dispatch(setSocket(null))

    
  //       }
     
  //   }else if(socket){
  //     socket.close()
  //     dispatch(setSocket(null))


  //   }
    

    
   
  // }, [user,dispatch])
   
  
    

  


  return (
   <>

    <RouterProvider router={browserRouter}/>
    
   </>
  )
}

export default App

