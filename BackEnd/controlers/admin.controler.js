import { User } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import createuser from '../services/user.service.js';
import bcrypt from 'bcrypt'
import { blacklist } from '../models/blackList.Token.js';
import dataURI from '../db/dataURI.js';
import cloudinary from '../db/cloudnary.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/order.js';


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




export async function Get_All_Users(req, res) {
   const adminID= req.user._id
     
        try {

        const admin = await User.findById({ _id:adminID }).select("-password")
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }
        if(admin.role ==='admin') {

            const Total_Users = await User.find({ 
                role: { $nin: ['seller', 'admin'] } 
              }).select("-password");

              const Total_Product = await Product.find() 
               
              const Total_Orders = await Order.find().sort({createdAt:-1}) 
              const Total_Completed_Orders = await Order.find({ orderStatus:'Delivered'})  
              const Total_pending_Orders = await Order.find({ orderStatus:'Pending'})  
              const Total_Cancelled = await Order.find({ orderStatus:'Cancelled'})  





             res.status(200).json({message:"All User Fetched ",success:true,Total_Product,Total_Users,Total_Orders,Total_Completed_Orders,Total_pending_Orders,Total_Cancelled})


        }
        else  {
            return res.status(400).json({ message: "You are not the admin" })
        }
            // res.status(400).json({ message: "You are not the admin" })



        // const S_Users = await User.find({ role: { $ne: 'seller admin' } }).select("-password")
        // if (!S_Users) {

        // }

    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' });
    }

}

export async function Get_Top_Sellers(req, res) {
    const adminID= req.user._id
      
         try {
 
         const admin = await User.findById({ _id:adminID }).select("-password")
         if (!admin) {
             return res.status(400).json({ message: "Admin not found" });
         }
         if(admin.role ==='admin') {
             const Total_Sellers = await User.find({ 
                 role:'seller'} 
               ).select("-password");
               const minOrders = 10;
 
            //    const Top_Sellers = await User.findOne({ role:'seller'},{sellersorders: { $gte: minOrders }}).select("-password");
            const Top_Sellers = await User.find(
                {
                  role: 'seller',
                  $expr: { $gte: [{ $size: "$sellersorders" }, minOrders] }
                },
                { password: 0 } // Exclude the password field
              ).populate({path:'sellersorders',model:'Order',})

            
              res.status(200).json({message:"All sellers Fetched ",success:true,Top_Sellers,Total_Sellers})
 
 
         }
         else  {
             return res.status(400).json({ message: "You are not the admin" })
         }
             // res.status(400).json({ message: "You are not the admin" })
 
 
 
         // const S_Users = await User.find({ role: { $ne: 'seller admin' } }).select("-password")
         // if (!S_Users) {
 
         // }
 
     }
 
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Server error' });
     }
 
 }

 export async function Get_Admins(req, res) {
    const adminID= req.user._id
      
         try {
 
         const admin = await User.findById({ _id:adminID }).select("-password")
         if (!admin) {
             return res.status(400).json({ message: "Admin not found" });
         }
         if(admin.role ==='admin') {
             const Total_Amins = await User.find({ 
                 role:'admin'} 
               ).select("-password");
              
              res.status(200).json({message:"All sellers Fetched ",success:true,Total_Amins})
 
 
         }
         else  {
             return res.status(400).json({ message: "You are not the admin" })
         }
             // res.status(400).json({ message: "You are not the admin" })
 
 
 
         // const S_Users = await User.find({ role: { $ne: 'seller admin' } }).select("-password")
         // if (!S_Users) {
 
         // }
 
     }
 
     catch (err) {
         console.log(err)
         return res.status(500).json({ message: 'Server error' });
     }
 
 }

 


 export async function Change_Role(req, res) {
    const adminID = req.user._id;
    const { userID, role } = req.body;

    try {
        const admin = await User.findById({ _id: adminID }).select("-password");
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }

        if (admin.role === 'admin') {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: userID },
                { role: role },
                { new: true } // This option returns the updated document
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({
                message: `${updatedUser.username} is now a ${updatedUser.role}`,
                success: true
            });
        } else {
            return res.status(400).json({ message: "You are not the admin" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
}


export async function Get_user(req, res) {
    // const adminID = req.user._id;
    const {id}=req.params;
    // const { userID, role } = req.body;

    try {
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            return res.status(400).json({ message: "Customer not found ", success: false });
        }
        return res.status(200).json({ message: "Customer found successfull ", success: true,user });


       
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function Get_seller(req, res) {
    const { id } = req.params;

    try {
        // Find the seller by ID, populate their orders, and exclude the password field
        const seller = await User.findById(id)
            .select("-password")
            .populate({
                path: 'sellersorders',
                model: 'Order',
                select: 'orderStatus', // Select only the orderStatus field
            });

        if (!seller) {
            return res.status(404).json({ message: "Seller not found", success: false });
        }

        // Initialize order summary counts
        const orderSummary = {
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            canceled: 0,
        };

        // Count orders by status
        seller.sellersorders.forEach(order => {
            orderSummary[order.orderStatus.toLowerCase()] += 1;
        });

        return res.status(200).json({
            message: "Seller found successfully",
            success: true,
            seller: {
                username: seller.username,
                email: seller.email,
                gender: seller.gender,
                role: seller.role,
                profilePic: seller.profilePic,
                orders: orderSummary, // Return the aggregated order summary
            },
        });

    } catch (err) {
        console.error("Error fetching seller:", err);
        return res.status(500).json({ message: "Server error", success: false });
    }
}



export async function Get_Order(req, res) {
    ;
     const {id}=req.params;
   
 
     try {
         const order = await Order.findById({ _id: id })
         if (!order) {
             return res.status(400).json({ message: "Order not found ", success: false });
         }
        //  console.log(seller.username)
         return res.status(200).json({ message: "Order found successfull ", success: true,order });
 
     } catch (err) {
         console.log(err);
         return res.status(500).json({ message: 'Server error' });
     }
 }






// export async function follow_un_follow(req, res) {


//     const jis_ko_follw_krna_hai= req.body.id 
//     const jo_follow_kryga = req.user.id


//     try {
        
//         if (jis_ko_follw_krna_hai===jo_follow_kryga) {
//             res.status(400).json({ message: "cant follow yourself " })
//         }

//         const user  = await User.findById({_id:jo_follow_kryga})
//         const tagget_user = await User.findById({_id:jis_ko_follw_krna_hai})

//         if(!user||!tagget_user){
//             res.status(400).json({ message: "not found user to follow  " })
//         }

//         const id_followig=user.following.includes(jis_ko_follw_krna_hai)

//         if(id_followig){
//             // unfollow ka logic 
//             // user.following=user.following.filter(id=>id!==jis_ko_follw_krna_hai)
//             // tagget_user.followers=tagget_user.followers.filter(id=>id!==jo_follow_kryga)

//             await Promise.all([
//                 User.updateOne({_id:jo_follow_kryga},{$pull:{following:jis_ko_follw_krna_hai}}),
//                 User.updateOne({_id:jis_ko_follw_krna_hai},{$pull:{followers:jo_follow_kryga}})
//             ])
//         }else{
//             // follow ka logic

//             await Promise.all([
//                 User.updateOne({_id:jo_follow_kryga},{$push:{following:jis_ko_follw_krna_hai}}),
//                 User.updateOne({_id:jis_ko_follw_krna_hai},{$push:{followers:jo_follow_kryga}})
//             ])

//         }
//         res.status(200).json({
//             message: "follow/unfollow user successfully",
//             user
//         })
//     }

//     catch (err) {
//         console.log(err)
//         return res.status(500).json({ message: 'Server error' });
//     }

// }

