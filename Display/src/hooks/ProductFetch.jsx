import React,{useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setAll_Products } from '../redux/producttSlice';


const ProductFetch = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetch = async () => {
          try{
              const response = await axios.get(`https://malboosat-1.onrender.com/product/allproduct`)
              console.log(response)
              dispatch(setAll_Products(response?.data.products))
              console.log("fetch",response?.data.products)

               
          }
          catch(e){
              console.error(e);
          } 
      }
      fetch()
      }, [setAll_Products,dispatch]);
 
}

export default ProductFetch