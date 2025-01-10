import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
// import { CartProvider } from "../../FrontEnd/src/context/CartContext";

const userShema=new mongoose.Schema({
    
        username:{
            type:String,
            required: true,
            minlength:[3,'First name must be 3 character long ']
        },
    
    

    email:{
        type:String,
        required: true,

    },

    password:{
        type:String,
        minlength:[6,'Password must be 3 character long '],
        select : false,
        required: true,
    },
    profilePic:{
        type:String,
        default:'https://www.gravatar.com/avatar/?d=identicon&s=200'
    },
   

    gender:{
        type:String,
       enum:['male','female'],
       default:'female'
    //    required:true
       
    },
    role: {
        type: String,
        enum: ['admin', 'seller', 'user'],
        default: 'user', // Default value for the role field
    },
    

    custmuerorders:[{type:mongoose.Schema.Types.ObjectId, ref:'Order'}],
    Cart:[{type:mongoose.Schema.Types.ObjectId,ref:'Cart' }],
    sellersorders:[{type:mongoose.Schema.Types.ObjectId, ref:'Order'}],
    products:[{type:mongoose.Schema.Types.ObjectId,ref:'product'}],
    rating:[{type:mongoose.Schema.Types.ObjectId,ref:'users'}]

    // :[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
    // bookmark:[{type:mongoose.Schema.Types.ObjectId, ref:'Post'}]






})

userShema.methods.genrateToken=function(){
    const token = jwt.sign({id:this._id},'TXNQzh7dcKq/kb7WXhw22IaYI/cHd7y7vRezaLHeWOQS=',{ expiresIn: 60 * 60 })
    // console.log(this.fullname)
    return token
}

userShema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userShema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

export const User=mongoose.model('users',userShema)




