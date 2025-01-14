import { FaHome, FaBars, FaUserFriends } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { useSelector } from 'react-redux';
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { FcAssistant } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import { FcHome } from "react-icons/fc";

import { FcInternal } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Users, Package, DollarSign, TrendingUp, ListOrdered ,GitPullRequestClosed ,BookOpenCheck  } from 'lucide-react';

import { FcVoicePresentation } from "react-icons/fc";
import axios from "axios";

const Nav = ({toggleDrawer, children }) => {
    const token = localStorage.getItem('token');
    const {user}=useSelector(store=>store.auth)
    // const [newuser,setloginrole] =useState()
   
    const navigate=useNavigate()  
    // const user.role='seller'
    const drawer =true
  return (
    <>
    
        { user?.role ==='admin' ? (
        
        <div className="flex  ">
          
            <div className={`border-l-2 max-md:hidden  flex flex-col justify-between shadow-lg fixed top-0 left-0 h-full pl-3 bg-white overflow-hidden text-black font-semibold z-10`}>
               
                <div className={`${drawer ?'w-64':'hidden'} `}>
                <div className="p-4 flex">
                    <div className="block mt-2">
               

                     
                    </div> 
                    {/* <img alt="Logo" className="w-12 h-12" /> */}
                </div>

                <div className="p-2 flex cursor-pointer mt-6 hover:bg-gray-200" onClick={()=>navigate('/A_Home')} >
                    <FcHome className="h-8 w-8 text-blue-500 text-3xl cursor-pointer" />
                    <p className='pl-2' >Home</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_Totaladmins')}>
                    <FcBusinessman className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Total Admins</p>
                </div>

                

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalsellers')}>
                    <FcCustomerSupport className="text-3xl text-blue-500 cursor-pointer" />
                    <p className='pl-2'>Total Sellers</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalcustomer')} >
                    <Users className="text-2xl text-blue-600 cursor-pointer " />
                    <p className='pl-2'>total Customer</p>
                </div>
                

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalOrders')}>
                    <Package className=" h-8 w-8 text-green-500  cursor-pointer" />
                    <p className='pl-2'>TotalOrders</p>
                </div>
                
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_Createcollection')}>
                    <Package className=" h-8 w-8 text-green-500  cursor-pointer" />
                    <p className='pl-2'>Create Collection</p>
                </div>

                
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/userfeedback')}>
                    <FcVoicePresentation className="text-black text-3xl cursor-pointer" />
                    <p className='pl-2'>Help</p>
                </div>

            </div>
            {/* <div className="   p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/GetFeedBack')}>
            <FaBars className=" text-3xl cursor-pointer" onClick={toggleDrawer} />
                    <p className='pl-2'>More</p>
                </div> */}
            </div>
            <div className="ml-64    max-md:ml-0 w-full">
                {children}
            </div>
        </div>
        ):user?.role==='seller'?(<div className="flex">
            <div className={`fixed  pt-12 max-md:hidden top-0 left-0 h-full pl-3 bg-white overflow-hidden text-black font-semibold z-10`}>
                <div className="p-4 flex">
                    {/* <div className="block mt-2">
                        <FaBars className="text-[#FF3F3E] text-3xl cursor-pointer" onClick={toggleDrawer} />
                    </div> */}
                    {/* <img alt="Logo" className="w-12 h-12" /> */}
                </div>
                <div className={`${drawer ?'w-64':'hidden'}`}>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_Home')}>
                    <FcHome className="text-3xl cursor-pointer" />
                    <p className={`pl-2`}>Home</p>
                </div>
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/CreateProduct')}>
                    <FcAddImage className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Create Product</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_RecivedOrder')}>
                    {/* <div className='w-6 h-6 bg-[#D9D9D9] rounded-full' /> */}
                    <FcInternal className="text-black text-3xl cursor-pointer"/>
                    <p className='pl-2'>Recived Order</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/userFeedback')}>
                    <FcAssistant className="text-black text-3xl cursor-pointer" />
                    <p className='pl-2'>Feedback </p>
                </div>

                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200">
                    <img alt="Logo" className="w-6 h-6" />
                    <p className='pl-2'>Friends</p>
                </div> */}

                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200">
                    <FaUserFriends className="text-2xl cursor-pointer text-black" />
                    <p className='pl-2'>Groups</p>
                </div> */}

                

                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/userFeedback')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Recived Feedback</p>
                </div> */}
                </div>
            </div>
            <div className="ml-64    max-md:ml-0 w-full ">
                {children}
            </div>
        </div>): user?.role==='user'||user?.role===''||user?.role===undefined ? (<div className=" w-full">
                {children}
            </div>):""
        }
        </>
  )
}

export default Nav