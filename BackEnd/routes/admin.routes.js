import express from 'express';
// import { body } from 'express-validator';
import * as adminControler from '../controlers/admin.controler.js'
import AuthUser from '../middlewares/auth.middleware.js';

const router=express.Router();

router.get('/allusers',AuthUser,adminControler.Get_All_Users)
router.get('/topsellers',AuthUser,adminControler.Get_Top_Sellers)
router.post('/changerole',AuthUser,adminControler.Change_Role)
router.get('/totaladmins',AuthUser,adminControler.Get_Admins)

router.get('/getseller/:id',AuthUser,adminControler.Get_seller)
router.get('/getcustomer/:id',AuthUser,adminControler.Get_user)
router.get('/getorder/:id',AuthUser,adminControler.Get_Order)




// router.get('/getproduct/:id',productControler.get_product)








export default router