import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const commmentShema=new mongoose.Schema({
    

    text:{
        type: String,
        required: true,
    },
  
    post:{type:mongoose.Schema.Types.ObjectId, ref:'Post',required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'users',required:true},


   






})


export const Comment=mongoose.model('Comment',commmentShema)


