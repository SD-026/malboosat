import mongoose from "mongoose";

const blacklistShema = new mongoose.Schema({
    token:{
        type:String,

        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires:86400
    }
})

export const blacklist= mongoose.model('Blacklist', blacklistShema)