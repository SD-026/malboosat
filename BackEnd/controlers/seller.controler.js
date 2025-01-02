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

    const { username, email, password } = req.body;
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

export async function getUserProfile(req, res) {
    const getID =req.params.id
    // console.log(req.params.id)
    // console.log(getID)
    const user = await User.findById(getID).select("-password")
    res.status(200).json(user)

    
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
    const { bio, gender } = req.body;
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
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePic && cloudResponse) user.profilePic = cloudResponse.secure_url;

        // Save updated user data
        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}




export async function suggestedusers(req, res) {
     
    try {
        const S_Users = await User.find({ _id: { $ne: req.user._id } }).select("-password")
        if (!S_Users) {
            res.status(400).json({ message: "No suggested users " })

        }
        res.status(200).json(S_Users)

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' });
    }

}



export async function follow_un_follow(req, res) {


    const jis_ko_follw_krna_hai= req.body.id 
    const jo_follow_kryga = req.user.id


    try {
        
        if (jis_ko_follw_krna_hai===jo_follow_kryga) {
            res.status(400).json({ message: "cant follow yourself " })
        }

        const user  = await User.findById({_id:jo_follow_kryga})
        const tagget_user = await User.findById({_id:jis_ko_follw_krna_hai})

        if(!user||!tagget_user){
            res.status(400).json({ message: "not found user to follow  " })
        }

        const id_followig=user.following.includes(jis_ko_follw_krna_hai)

        if(id_followig){
            // unfollow ka logic 
            // user.following=user.following.filter(id=>id!==jis_ko_follw_krna_hai)
            // tagget_user.followers=tagget_user.followers.filter(id=>id!==jo_follow_kryga)

            await Promise.all([
                User.updateOne({_id:jo_follow_kryga},{$pull:{following:jis_ko_follw_krna_hai}}),
                User.updateOne({_id:jis_ko_follw_krna_hai},{$pull:{followers:jo_follow_kryga}})
            ])
        }else{
            // follow ka logic

            await Promise.all([
                User.updateOne({_id:jo_follow_kryga},{$push:{following:jis_ko_follw_krna_hai}}),
                User.updateOne({_id:jis_ko_follw_krna_hai},{$push:{followers:jo_follow_kryga}})
            ])

        }
        res.status(200).json({
            message: "follow/unfollow user successfully",
            user
        })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' });
    }

}

export async function New_Product(req, res, next) {
        const {productname,productdescribtion,productprice,image,owner}=req.body
        // const authid = req.user._id
        // const image=req.file
        // console.log("bsdk",image)
    
        // if(!image) {return res.status(400).json({message:'image not found'})}
    
        // const optimze_img=await sharp(image.buffer)
        // .resize({ width: 800, height: 800,fit:'inside' })
        // .toFormat('jpeg',{quality:80})
        // .toBuffer()
    
        // const fileuri=`data:image/jpeg;base64,${optimze_img.toString('base64')}`
        
        // const result=await cloudinary.uploader.upload(fileuri)
        
        // console.log("result",result)
    
        const data={
            // image:result.secure_url,
            productname,productdescribtion,productprice,owner
        }
        const C_product =await Product.create(data)
        
    
    
        const user= await User.findByIdAndUpdate({_id:owner},{$push:{products:C_product._id}})
        // console.log(user,"created")
        
    
    
        // Send a response with the token and us    er data
        res.status(201).json({user,C_product,message:"product created successfully",success:true });
    }
    

