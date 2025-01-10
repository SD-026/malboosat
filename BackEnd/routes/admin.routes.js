import express from 'express';
// import { body } from 'express-validator';
import * as adminControler from '../controlers/admin.controler.js'
import AuthUser from '../middlewares/auth.middleware.js';

const router=express.Router();

router.get('/allusers',AuthUser,adminControler.Get_All_Users)
router.get('/topsellers',AuthUser,adminControler.Get_Top_Sellers)

// router.get('/getproduct/:id',productControler.get_product)








export default router