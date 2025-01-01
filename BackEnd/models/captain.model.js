import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userShema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required: true,
            minlength:[3,'First name must be 3 character long ']

        },
        lastname:{
            type:String,
            // required: true,
            minlength:[3,'First name must be 3 character long ']

        }
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
    socketId:{
        type:String,
        // required: true,
    },

    status:{
        type:String,
        default:'inactive',
        enum:['active','inactive']
    },
    vehicle:{
        color:{
            type:String,
            required: true,
            minlength:[3,'Color must be 3 character long ']
        },
        capacity:{
            type:Number,
            required: true,
            minlength:[1,'Capacity must be 1 character long ']

        },
        plate:{
            type:String,
            required: true,
            minlength:[7,'Plate must be 7 character long ']
        },
        vehicleType:{
            type:String,
            required: true,
            // minlength:[3,'Vehicle type must be 3 character long ']
            enum:['car','motorcycle','auto']
        },
        location:{
            lat:{
                type:Number,
               
            },
            lng:{
                type:Number,
               
            }
        }

        

    }



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

export const captainModel=mongoose.model('captain',userShema)


