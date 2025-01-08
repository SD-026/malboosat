import React,{useState} from 'react';
import { Link, redirect, useNavigate, } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [rememberme, SetRememberme] = useState(false);
    const [username, setUsername] = useState(null);

    
    const navigate=useNavigate()


    const submit =async()=>{
        const data ={
            username:username,
            email: email,
            password: password
        }
        try{
            const response = await axios.post(`http://localhost:1020/user/register`,data)

            console.log(response)
            if(response.data){
            navigate('/login')
            }
            
            redirect('registration')


            
        }
        catch(e){
            console.error(e);
        }
    }





  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login to Your Account</h2>
        <div className="space-y-6">
        <div>
            <label   className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="name" 
              name="username" 
            //   id="email" 
              onChange={(e)=>setUsername(e.target.value)}
            //   required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div>
            <label   className="block text-sm font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              onChange={(e)=>setEmail(e.target.value)}
            //   required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div>
            <label  className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              onChange={(e)=>setPassword(e.target.value)}

            //   required 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
              onChange={(e)=>SetRememberme(e.target.value)}

                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" 
              /> */}
              {/* <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label> 
            </div> */}
            <div className="text-sm">
              <Link to={'ForgetPassword'} className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div>
            <button 
              type="submit" 
              onClick={submit}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </div>
        {/* <p className="mt-6 text-center text-sm text-gray-600">
          Or{' '}
          <Link to={'/registration'} className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default Register;
