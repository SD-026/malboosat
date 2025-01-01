import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const ConversationShema=new mongoose.Schema({
    

   
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'users'}],
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:'Message'}],
   
})


export const Conversation=mongoose.model('Conversation',ConversationShema)


