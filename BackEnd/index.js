import express  from "express";
import configDotenv  from 'dotenv';
import cors from'cors'
import connecttodb from "./db/db.js";
import router from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import sellerrouter from './routes/seller.routes.js'
import product from './routes/product.routes.js'
import admin from './routes/admin.routes.js'

import { app,server } from "./socket/socket.js";
import dotenv from 'dotenv'
import path from "path";

const __dirname = path.resolve();





dotenv.config({})
const port =process.env.PORT||1020;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connecttodb()



app.use('/user', router)
app.use('/seller', sellerrouter)
app.use('/product', product)

app.use('/admin',admin )
// app.use('/msg',msgRoutes)
app.use(express.static(path.join(__dirname, '/Display/dist')))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'Display','dist','index.html'));
})




app.get('/',(req,res)=>{
    res.send("Hello uber")

})
server.listen(port,()=>{
    console.log("Chl beee BSDK ",port)
})

