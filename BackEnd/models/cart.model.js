import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const cartShema=new mongoose.Schema({
    quantity :{
        type: Number,
        required: true,default:1
    },
    customer_id: {type:mongoose.Schema.Types.ObjectId, ref:'users'},

    Cartproduct:{type:mongoose.Schema.Types.ObjectId, ref:'product'}

})


export const cartmodel=mongoose.model('Cart',cartShema)


