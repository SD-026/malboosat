import { FaHome, FaBars, FaUserFriends } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = ({toggleDrawer, children }) => {
    const token = localStorage.getItem('token');
    // const [newuser,setloginrole] =useState()
    const newuser='user';
    const navigate=useNavigate()  
    // const newuser='seller'
    const drawer =true

    // useEffect(() => {
    //     const fetch = async () => {
         
    //       try{
    //           const response = await axios.get(`http://localhost:5555/api/getId`,{
    //             headers: {
    //              Authorization: `Bearer ${token}`,
    //          }, 
    //         })
    
    //         setloginrole(response.data.role)
    //         //   console.log("sheeraxz",response.data.role)
    
              
    //       }
    //       catch(e){
    //           console.error(e);
    //       }
    //   }
    //   fetch()
    
    //   }, [onload,token,newuser]);
  return (
    <>
    {/* {} */}
        { newuser ==='admin' ? (
        
        <div className="flex  ">
            {/* <div className={`fixed top-0 left-0 h-full pl-3 ${drawer ?'w-64':'hidden'} bg-white text-black font-semibold z-40`}> */}
            <div className={`border-l-2 max-md:hidden  flex flex-col justify-between shadow-lg fixed top-0 left-0 h-full pl-3 bg-white overflow-hidden text-black font-semibold z-40`}>
               
                <div className={`${drawer ?'w-64':'hidden'} `}>
                <div className="p-4 flex">
                    <div className="block mt-2">
                        {/* <FaBars className="text-[#FF3F3E] text-3xl cursor-pointer" onClick={toggleDrawer} /> */}

                      S.D_Shop
                    </div> 
                    {/* <img alt="Logo" className="w-12 h-12" /> */}
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/')} >
                    <FaHome className="text-3xl cursor-pointer" />
                    <p className='pl-2' >Home</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/help')}>
                    <CiHeart className="text-black text-3xl cursor-pointer" />
                    <p className='pl-2'>Help</p>
                </div>
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_Totaladmins')}>
                    <IoMdHelpCircleOutline className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Total Admins</p>
                </div>

                

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalsellers')}>
                    <IoMdHelpCircleOutline className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Total Sellers</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalcustomer')} >
                    <FaUserFriends className="text-2xl cursor-pointer text-black" />
                    <p className='pl-2'>total Customer</p>
                </div>
                

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/A_totalOrders')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>TotalOrders</p>
                </div>
                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/Notification')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Notification</p>
                </div>
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/CreatePost')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Create</p>
                </div>
                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/Profile')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Profile</p>
                </div> */}

            </div>
            <div className="   p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/GetFeedBack')}>
            <FaBars className=" text-3xl cursor-pointer" onClick={toggleDrawer} />
                    <p className='pl-2'>More</p>
                </div>
            </div>
            <div className="ml-64 max-md:ml-0 w-full">
                {children}
            </div>
        </div>
        ):newuser==='seller'?(<div className="flex">
            <div className={`fixed top-0 left-0 h-full pl-3 bg-white overflow-hidden text-black font-semibold z-40`}>
                <div className="p-4 flex">
                    <div className="block mt-2">
                        <FaBars className="text-[#FF3F3E] text-3xl cursor-pointer" onClick={toggleDrawer} />
                    </div>
                    {/* <img alt="Logo" className="w-12 h-12" /> */}
                </div>
                <div className={`${drawer ?'w-64':'hidden'}`}>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_Home')}>
                    <FaHome className="text-3xl cursor-pointer" />
                    <p className={`pl-2`}>Home</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_RecivedOrder')}>
                    <div className='w-6 h-6 bg-[#D9D9D9] rounded-full' />
                    <p className='pl-2'>S_RecivedOrder</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_Feedback')}>
                    <CiHeart className="text-black text-3xl cursor-pointer" />
                    <p className='pl-2'>S_Feedback </p>
                </div>

                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200">
                    <img alt="Logo" className="w-6 h-6" />
                    <p className='pl-2'>Friends</p>
                </div> */}

                {/* <div className="p-2 flex cursor-pointer hover:bg-gray-200">
                    <FaUserFriends className="text-2xl cursor-pointer text-black" />
                    <p className='pl-2'>Groups</p>
                </div> */}

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/S_CreateOrder')}>
                    <IoMdHelpCircleOutline className="text-3xl cursor-pointer" />
                    <p className='pl-2'>S_CreateOrder</p>
                </div>

                <div className="p-2 flex cursor-pointer hover:bg-gray-200" onClick={()=>navigate('/Feedback')}>
                    <MdOutlineFeedback className="text-3xl cursor-pointer" />
                    <p className='pl-2'>Send Feedback</p>
                </div>
                </div>
            </div>
            <div className="ml-64 w-full ">
                {children}
            </div>
        </div>): newuser==='user'||newuser===''||newuser===undefined ? (<div className=" w-full">
                {children}
            </div>):""
        }
        </>
  )
}

export default Nav