import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const messageShema=new mongoose.Schema({
    

   
    senderId:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    reciverId:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
    message:[{type:String, required:true

    }],
})


export const Message=mongoose.model('Message',messageShema)


