import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const productShema=new mongoose.Schema({
    

    productname :{
        type: String,
    
        required: true
      
    },
    productdescribtion :{
        type: String,
        default:""
      
    },
    productprice:{
        type: String,
        required: true
      
    },
    image:{
        type: String,
        required: true
    },
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'users' },

    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'review'}],

    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],

   






})


export const Product=mongoose.model('product',productShema)


