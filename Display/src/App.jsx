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

// import { Route, Routes } from "react-router-dom";
// import AllProduct from "./screens/AllProduct";
// import Cart from "./screens/Cart";
// import Login from "./screens/Login";
// import Register from "./screens/Register";
// import SingleProduct from "./screens/SingleProduct";
// import Dashboard from "./screens/Dashboard";
// import Nav from "./screens/auth/nav";
// import A_Dashboad from "./screens/Admin/A_Dashboad";
// import Home from "./screens/Admin/Home";
// import Help from "./screens/Admin/Help";
// import TotalCustomers from "./screens/Admin/TotalCustomers";
// import TotalOrders from "./screens/Admin/TotalOrders";
// import TotalSellers from "./screens/Admin/TotalSellers";
// import S_Home from "./screens/Seller/S_Home";
// import RecivedOrder from "./screens/Seller/RecivedOrder";
// import Feedback from "./screens/Seller/S_Feedback";
// import S_CreateOrder from "./screens/Seller/S_CreateOrder";
// import CreateOrder from "./screens/CreateOrder";
// import Middleware from "./screens/auth/Middleware";
// import S_SingleProduct from "./screens/Seller/S_SingleProduct";
// import Myorder from "./screens/Myorder";
// import TotalAdmins from "./screens/Admin/TotalAdmins";
// import Chat from "./screens/Chat/Chat";
// import Setname from "./screens/Chat/Setname";




// export default function App() {


//   return (
//     <div>
//       {/* <AllProduct/> */}
//       <Dashboard/>
//       {/* <Chat/> */}


//       <Routes>
//       {/* <Nav> */}
        
//       <Route path='/' element={<Nav><Middleware required_role="user" ><AllProduct /></Middleware></Nav>}/>
//       {/* <Route path='/' element={<Middleware required_role="user" ><AllProduct /></Middleware>}/> */}


//       <Route path='/chat' element={<Nav> <Middleware required_role="user" ><Chat/></Middleware></Nav>}/>
//       <Route path='/setname' element={ <Middleware required_role="user" ><Setname/></Middleware>}/>


//       <Route path='/login' element={<Login/>}/>
//       <Route path='/registration' element={<Register/>}/>
//       <Route path={`/SingleProduct/:id`} element={<SingleProduct/>}/>
//       <Route path={`/CreateOrder`} element={<Nav><Middleware required_role="user" ><CreateOrder/></Middleware></Nav>}/>
//       <Route path={`/myorder`} element={<Nav><Middleware required_role="user" ><Myorder/></Middleware></Nav>}/>

      


//       <Route path='/nav' element={<Nav><Middleware required_role="admin" ><Nav><Dashboard/></Nav></Middleware></Nav>}/>

//       <Route path={'/A_dashboard'} element={<Middleware required_role="admin" ><A_Dashboad/></Middleware>}/>
//       <Route path={'/A_Home'} el  ement={<Nav><Middleware required_role="admin" ><Home/></Middleware></Nav>}/>
//       <Route path={'/A_help'} element={<Help/>}/>
//       <Route path={'/A_totalcustomer'} element={<Middleware required_role="admin" ><TotalCustomers/></Middleware>}/>
//       <Route path={'/A_totalOrders'} element={<Middleware required_role="admin" ><TotalOrders/></Middleware>}/>
//       <Route path={'/A_totalsellers'} element={<Middleware required_role="admin" ><TotalSellers/></Middleware>}/>
//       <Route path={'/A_Totaladmins'} element={<Middleware required_role="admin" ><TotalAdmins/></Middleware>}/>



//       <Route path={'/S_Home'} element={<Middleware required_role="seller" ><S_Home/></Middleware>}/>
//       <Route path={'/S_RecivedOrder'} element={<Middleware required_role="seller" ><RecivedOrder/></Middleware>}/>
//       <Route path={'/S_Feedback'} element={<Middleware required_role="seller" ><Feedback/></Middleware>}/>
//       <Route path={'/S_CreateOrder'} element={<Middleware required_role="seller" ><S_CreateOrder/></Middleware>}/>
//       <Route path={'/S_Product/:id'} element={<Middleware required_role="seller" ><S_SingleProduct/></Middleware>}/>
      


//       {/* </Nav> */}







//       </Routes>
//     </div>
//   )
// }

