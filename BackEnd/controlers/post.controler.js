// import { User } from '../models/user.model.js';
// import { validationResult } from 'express-validator';
// import createuser from '../services/user.service.js';
// import bcrypt from 'bcrypt'
// import { blacklist } from '../models/blackList.Token.js';
// import dataURI from '../db/dataURI.js';
// import cloudinary from '../db/cloudnary.js';
// import {Post } from '../models/Post.js';
// import sharp from 'sharp';
// import { Comment } from '../models/Comment.js';
// import { getReciverSocketId, io } from '../socket/socket.js';


// export async function addnewpost(req, res, next) {
//     const {caption}=req.body
//     const authid = req.user._id
//     const image=req.file
//     // console.log("bsdk",image)

//     if(!image) {return res.status(400).json({message:'image not found'})}

//     const optimze_img=await sharp(image.buffer)
//     .resize({ width: 800, height: 800,fit:'inside' })
//     .toFormat('jpeg',{quality:80})
//     .toBuffer()

//     const fileuri=`data:image/jpeg;base64,${optimze_img.toString('base64')}`
    
//     const result=await cloudinary.uploader.upload(fileuri)
    
//     // console.log("result",result)

//     const data={
//         caption,
//         image:result.secure_url,
//         author:authid
    
//     }
//     const posts =await Post.create(data)
//     // console.log(post)


//     const user= await User.findByIdAndUpdate({_id:authid},{$push:{post:posts._id}})
//     // console.log(user,"created")
    


//     // Send a response with the token and us    er data
//     res.status(201).json({user,posts,message:"post created successfully",success:true });
// }


// export async function get_user_post(req, res, next) {
//     const userID = req.user._id

//    try {
//     const post = await Post.find({author:userID}).sort({createdAt:-1})
//     .populate({path:'author',select:('username profilePic _id')})  //outer populate  
//     .populate({path:'comments',sort:({createdAt:-1}),populate:{path:'author', select:'username profilePic _id'} //inner populate 
// })
// return res.status(200).json({message:"Fetch all post ",post})
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
//    }}

//    export async function get_all_post(req, res, next) {
//     const userID = req.user._id

//    try {
//     const post = await Post.find().sort({createdAt:-1})
//     .populate({path:'author',select:('username profilePic _id')})  //outer populate  
//     .populate({path:'comments',sort:({createdAt:-1}),populate:{path:'author', select:'username profilePic _id'} //inner populate 
// })
// return res.status(200).json({message:"Fetch all post ",post})
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
//    }}


//    export async function Like_to_post(req, res, next) {
//     const userID = req.user._id
//     const {postID} = req.body
//     // console.log(`Like_to_post`,postID)

//     const post = await Post.findById(postID)
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }

//     // console.log(userID)
//    try {
//    await  post.updateOne({$addToSet:{likes:userID}})
//    await post.save()

//    const user = await User.findById(userID).select('username profilePic') 
//    const postOwnerID=post.author.toString()
//    if(userID!==postOwnerID){
//     const notification={
//         type:'like',
//         userID:userID,//jis ny like keya hai 
//         userDetails:user,//jis ny like keya hai us ki details
//         postID,
//         message:'your post is liked '
        
//     }
//    const postOwnersocketid=getReciverSocketId(postOwnerID)
//    io.to(postOwnersocketid).emit('notification',notification)



//    }

//     //inner populate 

//       return res.status(200).json({message:"Post Liked Success ",post})
    
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
    
//    }


// }

// export async function DisLike_to_post(req, res, next) {
//     const userID = req.user._id
//     const {postID} = req.body
//     console.log("dislike", userID, postID)

//     const post = await Post.findById(postID)
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }


//    try {
//    await post.updateOne({$pull:{likes:userID}})
//     await post.save()
//     //inner populate 

//     const user = await User.findById(userID).select('username profilePic') 
//     const postOwnerID=post.author.toString()
//     if(userID!==postOwnerID){
//      const notification={
//          type:'dislike',
//          userID:userID,//jis ny like keya hai 
//          userDetails:user,//jis ny like keya hai us ki details
//          postID,
//          message:'your post is disliked '
         
//      }
//     const postOwnersocketid=getReciverSocketId(postOwnerID)
//     io.to(postOwnersocketid).emit('notification',notification)
 
 
 
//     }

//       return res.status(200).json({message:"Post DisLiked Success ",post})
    
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
    
//    }
// }



// export async function Add_comment_to_post(req, res, next) {
//     const userID = req.user._id
//     const postID = req.params.id
//     const {text}=req.body
//     // console.log(text)

//     const post = await Post.findById(postID)
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }

//    try {

//     const comment = await Comment.create({
//         text,
//         post:post._id,
//         author:userID
//     })
//     await comment.populate({path:'author',select:'username profilePic _id'})
//         // post.updateOne({$push:{comments:comment._id}})
        
//     post.comments.push(comment._id)
//     await post.save()
//     //inner populate 

//       return res.status(200).json({message:"commented sucessfully ",comment})
    
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
    
//    }
// }



// export async function get_comments_of_post(req, res, next) {
    
//     const postID = req.params.id
//     try {
//     const post = await Comment.find({post:postID}).populate({path:'author',select:('username,profilePic,_id')})
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }

//       return res.status(200).json({message:"get all comments of onepost sucessfully ",post})

//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
//    }
// }

// export async function delete_post(req, res, next) {
//     const userID = req.user._id
//     const {postID} = req.body
//     console.log(`deleting post ${postID}`)
//     try {

//     const post = await Post.findById(postID)
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });

//     }
    
//     if (String(post.author)!== String(userID)) {
//         return res.status(401).json({ message: 'Unauthorized to delete this post' });
//     }

//     await Post.findByIdAndDelete(postID)
//     //delete the post from user POSTS

//     const user = await User.findByIdAndUpdate({_id:userID},{$pull:{post:postID}})

//     //delete comments 

//     const comments = await Comment.deleteMany({post:postID})

//       return res.status(200).json({message:"Post deleted ",post,user})
      
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
//    }
// }


// export async function Add_to_bookmark(req, res, next) {
//     const userID = req.user._id
//     const postID = req.params.id
//     try {

//     const post = await Post.findById(postID)
//     if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//     }
//     const user = await User.findOne(userID)
    
// if(user.bookmark.includes(postID)) {
//     await  user.updateOne({$pull:{bookmark:postID}})
//     await user.save()
//     return res.status(200).json({message:"Post removed  bookmarked successfully ",user})

// }else{
//    await  user.updateOne({$addToSet:{bookmark:postID}})
//     await user.save()
//     return res.status(200).json({message:"Post bookmarked successfully ",user})

// }
      
//    } catch (error) {
//     console.log(error)
//     return res.status(500).json({message:"Server error"})
//    }
// }

