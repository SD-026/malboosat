import express from 'express';
import * as msgControler from '../controlers/message.controler.js'
import  AuthUser from '../middlewares/auth.middleware.js';

// import upload from multer
// import multer from '../middlewares/multer.js';

const router=express.Router();

router.post('/send',AuthUser,msgControler.send_message)

router.post('/all',AuthUser,msgControler.get_messages)


export default router