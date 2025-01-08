import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
// import Login form '..'



const Middleware = ({ children, required_role }) => {
  const token = localStorage.getItem('token');
  const [logedin_role, setloginrole] = useState()
  // console.log(token)


  useEffect(() => {
    const fetch = async () => {

      try {
        const response = await axios.get(`http://localhost:5555/api/getId`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setloginrole(response.data.role)
        // console.log("sheeraxz", response.data.role)


      }
      catch (e) {
        console.error(e);
      }
    }
    fetch()

  }, []);
  // const logedin_role="user"

  if (required_role===logedin_role) {
    return children
  }
  else {
    return <div>
      Fuck Off bro and have a login 
      <Link to={'/login'}>
         Create Acc and login</Link>
    </div>

  }
}

export default Middleware