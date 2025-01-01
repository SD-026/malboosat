import mongoose from 'mongoose'
import dotenv  from 'dotenv'
dotenv.config({})

export default function connecttodb(){
    mongoose.connect(process.env.Mongo_URL)
    .then(()=>{
  console.log('DB conected')
    })
    .catch((e)=>{
        console.log(e)
    })
}

