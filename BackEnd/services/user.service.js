import { User } from "../models/user.model.js";


export default async function createuser ({gender,username,email,password}){
    if(!email,!password){
        throw new Error("Email and password are required")
    }
    const user = await User.create({
        username,
        email,
        password,
        gender

    })

    return user
}