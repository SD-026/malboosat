import express from 'express';
import { body } from 'express-validator';
import * as sellerControler from '../controlers/seller.controler.js'
import  AuthUser from '../middlewares/auth.middleware.js';
// import upload from multer
// import multer from '../middlewares/multer.js';
import upload from '../middlewares/multer.js';
upload

const router=express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('innvalid Email'),
    body('username').isLength({min:3}).withMessage('Please enter min 3 character'),
    body('password').isLength({min:6}).withMessage('innvalid Email'),
],sellerControler.register)

router.post('/login',[
    body('email').isEmail().withMessage('innvalid Email'),
    body('password').isLength({min:6}).withMessage('innvalid password'),
],sellerControler.login)

router.get('/logout',sellerControler.blacklistToken)
router.post('/edit',AuthUser,upload.single('profilePic'),sellerControler.Edit)


router.post('/New_Product', upload.array('images', 5), AuthUser, sellerControler.New_Product);
router.post('/editproduct',AuthUser,sellerControler.editproduct)
router.post('/deleteproduct',AuthUser,sellerControler.delete_product)
router.post('/updatestatus',AuthUser,sellerControler.updateOrderStatus)

router.get('/getsellersproduct',AuthUser,sellerControler.get_sellersproduct)
router.get('/getorderhistory',AuthUser,sellerControler.getOrderHistory)







// router.get('/:id/profile',userControler.getUserProfile)
// router.post('/follow',AuthUser,userControler.follow_un_follow)
// router.get('/suggest',AuthUser,userControler.suggestedusers)
export default router