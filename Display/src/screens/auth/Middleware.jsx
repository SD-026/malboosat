import React, { useEffect, useState } from 'react'
import { Link,useNavigate,redirect } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';
// import Login form '..'



const Middleware = ({ children, required_role }) => {
  const token = localStorage.getItem('token');
  const [logedin_role, setloginrole] = useState()
  const {user}=useSelector(store=>store.auth)
  const navigate=useNavigate()

  // console.log(token)


  // useEffect(() => {
  //   const fetch = async () => {

  //     try {
  //       const response = await axios.get(`http://localhost:5555/api/getId`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       setloginrole(response.data.role)
  //       // console.log("sheeraxz", response.data.role)
  //     }
  //     catch (e) {
  //       console.error(e);
  //     }
  //   }
  //   fetch()

  // }, []);
  // const logedin_role="user"

  // console.log(user.role)
  // useEffect(()=>{
  //   if(!user){
  //     navigate('/login')
  //   }

  // },[])

  
  if (required_role===user?.role) {
    return children
  }
 
    // <div>
      
    //   Fuck Off bro and have a login 
    //   <Link to={'/login'}>
    //      Create Acc and login</Link>
    // </div>

  
}

export default Middleware