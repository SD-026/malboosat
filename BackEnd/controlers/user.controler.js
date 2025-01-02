import { User } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import createuser from '../services/user.service.js';
import bcrypt from 'bcrypt'
import { blacklist } from '../models/blackList.Token.js';
import dataURI from '../db/dataURI.js';
import cloudinary from '../db/cloudnary.js';
import { Product } from '../models/Product.js';


export async function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password,gender } = req.body;
    console.log(username, email, password);
    const isalready = await User.findOne({ email })

    if (isalready) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Use the static method to hash the password
    const hashedPassword = await User.hashPassword(password);

    const user = await createuser({
        username,
        email,
        password: hashedPassword,
        gender
    });

    // Generate a token for the new user
    const token = user.genrateToken();

    // Send a response with the token and user data
    res.status(201).json({ token, user });
}


export async function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).json({ message: 'invalid user or password' });
    }

    const isMatch = bcrypt.compare(password, user.password)
    // console.log(isMatch)


    // const isMatch=await User.comparepassword(password);

    if (!isMatch) {
        return res.status(404).json({ message: 'invalid user or password' });
    }

    const token = user.genrateToken();

    res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ token, user });
}




export async function blacklistToken(req, res) {

    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklist.create({ token })


    res.status(200).json({
        message: 'Token blacklisted successfully'
    })
}



export async function Edit(req, res) {
    const userID = req.user;
    const { username,password, gender } = req.body;
    const profilePic = req.file;

    try {
        // Validate user existence
        const user = await User.findById(userID._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let cloudResponse;

        // Handle profile picture upload
        if (profilePic) {
            try {
                const fileuri = dataURI(profilePic);
                cloudResponse = await cloudinary.uploader.upload(fileuri);
            } catch (error) {
                console.error("Error uploading to Cloudinary:", error);
                return res.status(500).json({ message: "Failed to upload profile picture" });
            }
        }

        // Update user fields
        if (username) user.username = username;
        if (gender) user.gender = gender;
        if (profilePic && cloudResponse) user.profilePic = cloudResponse.secure_url;

        // Save updated user data
        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}

export async function getcart(req, res) {
    const userID = req.user;


    try {
        // Validate user existence
        const user = await User.findById(userID._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cart=user.Cart;
        await user.save();

        res.status(200).json({
            message: "cart Get successfully",
            cart,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export async function add_to_cart(req, res) {
    // const userID = req.user;

    const {userID,P_id}=req.body
    console.log(userID)


    try {
        // Validate user existence

        const product = await Product.findById(P_id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }


        const user = await User.findById(userID._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        
             user.Cart.push(product);
    
        await user.save();

        res.status(200).json({
            message: "Add to cart  Get successfully",
            cart,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}










