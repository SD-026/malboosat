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
        type: Number,
        required: true
      
    },
    P_images: {
        type: [String], // Array of strings to store multiple image URLs
        required: true,
      },
      highlights:{
        type: [String], // Array of strings to store multiple highlights
        required: true,
      },
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'users' },

    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'review',default:0},],

    comments:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}],

})


export const Product=mongoose.model('product',productShema)


