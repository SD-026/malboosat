import { User } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import createuser from '../services/user.service.js';
import bcrypt from 'bcrypt'
import { blacklist } from '../models/blackList.Token.js';
import dataURI from '../db/dataURI.js';
import cloudinary from '../db/cloudnary.js';
import { Product } from '../models/Product.js';
import { cartmodel } from '../models/cart.model.js';
import { Order } from '../models/order.js';
import { isValidObjectId } from 'mongoose';


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
        // gender
    });

    // Generate a token for the new user
    const token = user.genrateToken();

    // Send a response with the token and user data
    res.status(201).json({ token, user, success: true });
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
    res.status(200).json({ token, user, sucess: true });
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
    const { username, password, gender } = req.body;
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
    const userID = req.user._id;


    try {
        // Validate user existence
        const user = await User.findById({ _id: userID }).populate({ path: 'Cart', model: 'Cart', populate: { path: 'Cartproduct', model: 'product' } })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }



        res.status(200).json({
            message: "cart Get successfully",
            user,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export async function add_to_cart(req, res) {
    const userID = req.user._id;


    const { P_id } = req.body


    try {
        // Validate user existence

        const product = await Product.findById(P_id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        const user = await User.findById(userID).populate({ path: 'Cart', model: 'Cart' })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.Cart.some((item) => String(item.Cartproduct) === String(P_id))) {
            return res.json({ message: "Product already in the  cart", sucess: false });
        }

        const data = {
            Cartproduct: product._id,
            customer_id: userID
        }

        const createdCart = await cartmodel.create(data)


        await user.updateOne({ $addToSet: { Cart: createdCart._id } })

        await user.save();

        res.status(200).json({
            message: "Product Add to cart successfully",
            user,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export async function remove_from_cart(req, res) {
    const userID = req.user._id;

    const { P_id } = req.body
    // console.log(userID)


    try {
        // Validate user existence

        const product = await Product.findById(P_id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }


        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });


        }

        const createdCart = await cartmodel.findOneAndDelete({ Cartproduct: product._id }, { customer_id: userID });

        await user.updateOne({ $pull: { Cart: createdCart._id } });

        await user.save();

        res.status(200).json({
            message: "delete to cart  Get successfully",
            user,
            sucess: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}



export async function update_cart(req, res) {
    const userID = req.user._id;

    const {  P_id, quantity } = req.body
    // console.log(userID)


    try {
        // Validate user existence

        const product = await Product.findById(P_id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }


        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const createdCart = await cartmodel.findOne({ Cartproduct: product._id , customer_id: userID });
        if(quantity==="plus"){

            const newquantity=  Number(createdCart.quantity)+1
            // console.log(newquantity)
            await createdCart.updateOne({ quantity:newquantity })

            await createdCart.save();
            res.status(200).json({
                message: "update to cart  Get successfully",
                createdCart,
                sucess: true
            });

        }
        if(quantity==="minus"){

            const newquantity=  Number(createdCart.quantity)-1
            // console.log(newquantity)
            await createdCart.updateOne({ quantity:newquantity })

            await createdCart.save();
            res.status(200).json({
                message: "update to cart  Get successfully",
                createdCart,
                sucess: true
            });

        }
    

       

       
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export async function place_order(req, res) {
    const userID = req.user._id;

    const { fullName, email, city, zipCode, paymentMethod, phone, address } = req.body;
    console.log(fullName, email, city, zipCode, paymentMethod, phone, address);

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cart = user.Cart;
        if (!cart || cart.length === 0) {
            return res.status(404).json({ message: "Cart not found" });
        }

        for (const item of cart) {
            const p_id_from_cart = await cartmodel.findById({ _id: item });

            if (!p_id_from_cart) {
                return res.status(404).json({ message: "Cart item not found" });
            }

            const owner_from_product = await Product.findById({ _id: p_id_from_cart.Cartproduct });
            const owner_from_user = await User.findById({ _id: owner_from_product.owner });
            const getprice = await Product.findById({ _id: p_id_from_cart.Cartproduct });

            if (owner_from_user.role === 'seller' || owner_from_user.role === 'admin') {
                const newOrder = {
                    customerId: userID,
                    sellerId: owner_from_user._id,
                    products:
                        {
                            productId: owner_from_product._id,
                            quantity: p_id_from_cart.quantity,
                            price: getprice.productprice
                        },
                    
                    totalAmount: Number(p_id_from_cart.quantity) * Number(getprice.productprice),
                    orderStatus: 'Pending',
                    shippingAddress: {
                        fullName,
                        email,
                        city,
                        zipCode,
                        phone,
                        address
                    },
                    paymentMethod,
                    paymentStatus: 'Pending'
                };

                const created_order = await Order.create(newOrder);
                await owner_from_user.updateOne({ $push: { sellersorders: created_order._id } });
                await User.findByIdAndUpdate(userID, { $push: { custmuerorders: created_order._id } });
            }
        }
        await user.updateOne({ $set: { Cart: [] } });

        // Send a single response after processing all cart items
        res.status(200).json({   
            message: "Order created successfully",
            success: true
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
    }
}












