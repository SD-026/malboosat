import express from 'express';
import { body } from 'express-validator';
import * as userControler from '../controlers/user.controler.js'
import  AuthUser from '../middlewares/auth.middleware.js';
// import upload from multer
// import multer from '../middlewares/multer.js';
import upload from '../middlewares/multer.js';
const router=express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('innvalid Email'),
    body('username').isLength({min:3}).withMessage('Please enter min 3 character'),
    body('password').isLength({min:6}).withMessage('innvalid Email'),
],userControler.register)

router.post('/login',[
    body('email').isEmail().withMessage('innvalid Email'),
    body('password').isLength({min:6}).withMessage('innvalid password'),
],userControler.login)
router.get('/logout',userControler.blacklistToken)
router.post('/edit',AuthUser,upload.single('profilePic'),userControler.Edit)

// router.post('/createproduct',AuthUser,userControler.createproduct)
// router.post('/editproduct',AuthUser,userControler.editproduct)
// router.post('/deleteproduct',AuthUser,userControler.deleteproduct)
// router.post('/deleteproduct',AuthUser,userControler.deleteproduct)












// router.get('/:id/profile',userControler.getUserProfile)
// router.post('/follow',AuthUser,userControler.follow_un_follow)
// router.get('/suggest',AuthUser,userControler.suggestedusers)








export default router