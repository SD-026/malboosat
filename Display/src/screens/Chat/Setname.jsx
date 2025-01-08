import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";



const socket = io("http://localhost:9999");



const Setname = () => {
    const navigate =useNavigate()
  const [name, setname ] = useState("");

    const handelname=()=>{
        // localStorage.setItem('name',name?name:'you')
        navigate('/chat',{
            state:{name:name


            }
        })
        socket.emit("new-user", name);
      

    
      }
  return (
    <div>
         <input
            type="text"
            placeholder="Type your name."
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
      <button onClick={handelname} className="p-2 bg-red-500 text-white rounded">setname</button>

    </div>
  )
}

export default Setname