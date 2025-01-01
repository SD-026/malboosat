// import { Conversation } from "../models/Conversation.js"
// import { Message } from "../models/Messag.jse"
import {Conversation} from '../models/Conversation.js'
import {Message} from '../models/Message.js'
import { getReciverSocketId, io } from '../socket/socket.js'
// import mongoose from 'mongoose'


import mongoose from "mongoose";
// import Conversation from "../models/Conversation"; // Update with your actual Conversation model import

export async function send_message(req, res, next) {
    const senderId = req.user._id; // Assuming `req.user` contains the authenticated user info
    const { reciverID, message } = req.body;

    try {
        // Validate the receiver ID
        if (!mongoose.Types.ObjectId.isValid(reciverID)) {
            return res.status(400).json({ message: "Invalid receiver ID format." });
        }

        const reciverId = new mongoose.Types.ObjectId(reciverID);

        // Check for an existing conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] } // $all expects an array, not an object
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId],
                messages: [] // Initialize the messages array
            });
        }

        // console.log("Conversation:", conversation);

        
        const newMessage = await Message.create({
            senderId,
            reciverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        // Optionally send a real-time update
        const reciverSocketId = getReciverSocketId(reciverId);
        if (reciverSocketId) {
            io.to(reciverSocketId).emit("new_message", newMessage);
        }

        return res.status(200).json({
            message: "Message sent successfully",
            conversationId: conversation._id,
             // Optionally return the conversation ID
             newMessage
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}






export async function get_messages(req, res, next) {

    const senderId = req.user._id
    const { reciverId } = req.body;

    try {
  const chat=await Conversation.findOne({
    participants:{$all:[senderId,reciverId]}
  }).populate('messages')
//   console.log(chat)
// const a={...chat}._id
// const ao=chat.find((item)=>item.messages)

// console.log("hi",ao )
// console.log("hi",chat )

  if (!chat) {
    return res.status(404).json({ message: []});
  }

  return res.status(200).json({ chat})



}
catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Server error' });
}

    
}