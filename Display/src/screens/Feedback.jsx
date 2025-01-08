
import React from 'react'
import { useState } from 'react';
// import axios from '../api/axios';
import { json, useNavigate, useNavigation } from 'react-router-dom'
import axios from 'axios';
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from 'react-toastify';
// import FeedbackSend from './FeedbackSend'
// import '../index.css'







function Feedback() {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
//   const [option, setOption] = useState('');
//   const [Design, setDesign] = useState(false);
  const [PopUp, setPopUp] = useState(false);
  const [charCount, setCharCount] = useState(0); 
//   const newuser=localStorage.getItem('user')
//   const user=JSON.parse(newuser)
//   const navigate=useNavigate()

  const sendMsg = async()=>{
    const data ={
        userID:user._id,
        username:user.username,
        type:type,
        message:message
    }
    try {
        const res =await axios.post(`http://localhost:8888/feedback`,data)
        console.log(res)
        if(res?.data){

        setPopUp(true)
        setTimeout(() => {
   
            setPopUp(false);
            navigate('/')
          }, 3000); 
        }

    }catch(error){
        console.error(error.message)

    }

  }


  const handleInputChange = (e) => {
    if(e.target.value.length <= 500){
      setMessage(e.target.value)
    }
    setCharCount(e.target.value.length);
  };

//   toast.success("Thanks For Feedback ", {
    //             position: "top-right",
    //             autoClose: 3000,
    //             className: 'toast-success-bg'
    //           })

  return (
    <>
      {/* <ToastContainer /> */}
      {PopUp&& 
      <div className='z-50 fixed flex justify-center items-center inset-0'>
        <div className='fixed bg-slate-400 inset-0 opacity-70'></div>
        <div className='relative w-auto  bg-white justify-center items-center p-10 text-center '>
        <h1 className='font-medium md:text-6xl sm:text-3xl text-xl text-center '>SEND US FEEDBACK</h1>
        </div>
      </div>}
      
      <div className='w-4/5 mx-auto'>
        <div>
          <h1 className='font-medium md:text-6xl sm:text-3xl text-xl text-center mt-12'>SEND US FEEDBACK</h1>
          {/* <p className='font-medium text-xl text-center mt-4'>Instructions</p> */}
        </div>
        <div className='flex md:flex-row sm:flex-col justify-center mt-8'>
          {/* <a href="#" className="inline-block bg-gray-300 text-center md:w-[90px] sm:w-[300px]   hover:bg-gray-300 text-black font-lg  py-1.5 md:px-7 sm:px-3 px-3  rounded-full" onClick={OtherOption}>Other</a> */}

          <div className="">
            <input
              id="name"
              name="name"
              type="text"
              onChange={(e) => setType(e.target.value)}
            //   value={option !== '' ? option : type}

              placeholder='Enter Type'
              autoComplete="name"
              required
              className="block md:w-[490px] sm:w-[300px] w-[200px]  md:ml-3 sm:ml-0 ml-0 rounded-xl border-0 py-1.5 px-4 text-black shadow-sm ring-1 ring-inset md:mt-0 sm:mt-3 mt-3 ring-black placeholder:text-black sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className='text-center relative w-full max-w-lg mx-auto mt-10'>
          <textarea
            id="message"
            rows="8"
            className=" p-2.5 w-full mt-8 text-sm md:mx-auto rounded-lg border border-black text-black ring-black placeholder:text-black"
            placeholder="Type your feedback here"
            onChange={(e) => handleInputChange(e)}
            value={message}
          ></textarea>
          <span className="absolute bottom-2 right-4 text-sm text-gray-500">{message.length} / 500</span>
          {/* <div className='text-right right-0 flex justify-end md:w-[900px] sm:w-[300px] w-[200px] mt-2'>
            <span
              id="charCount"
              className={`text-md font-semibold ${charCount < 1001 ? 'text-orange-300' : 'text-red-400'}`}
            >
              {charCount}/1000
            </span>
          </div> */}
        </div>

        <div className="text-sm text-center  md:ml-[500px]  sm:ml-[220px] ml-[150px] mt-3">
          <button className="ml-5 inline-block bg-black hover:bg-black  text-white font-lg py-1 px-5 rounded-full"
            onClick={sendMsg}
          // disabled={message==''&&option==''?true:false}
          >
            Send
          </button>
        </div>

      </div>


      {/* {PopUp && <FeedbackSend handlePopUp={handlePopUp} />} */}




    </>
  )
}

export default Feedback
