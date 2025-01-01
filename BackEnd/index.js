import express  from "express";
import configDotenv  from 'dotenv';
import cors from'cors'
import connecttodb from "./db/db.js";
import router from './routes/user.routes.js'
import cookieParser from "cookie-parser";
// import postRoutes from './routes/post.routes.js'
// import msgRoutes from './routes/message.routes.js'
import { app,server } from "./socket/socket.js";
import dotenv from 'dotenv'




dotenv.config({})
const port =process.env.PORT||1020;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connecttodb()



app.use('/user', router)
// app.use('/captain', captainRouter)
// app.use('/post',postRoutes )
// app.use('/msg',msgRoutes)




app.get('/',(req,res)=>{
    res.send("Hello uber")

})
server.listen(port,()=>{
    console.log("Chl beee BSDK ",port)
})

