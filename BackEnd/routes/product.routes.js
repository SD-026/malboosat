import express from 'express';
// import { body } from 'express-validator';
import * as productControler from '../controlers/post.controler.js'
// import  AuthUser from '../middlewares/auth.middleware.js';

// import upload from multer
// import multer from '../middlewares/multer.js';

// import upload from '../middlewares/multer.js';
// upload
const router=express.Router();

router.get('/allproduct',productControler.all_product)
router.get('/getproduct/:id',productControler.get_product)
// router.post('/alluserpost/:id',AuthUser,postControler.get_user_post)
// router.post('/likepost',AuthUser,postControler.Like_to_post)
// router.post('/dislikepost',AuthUser,postControler.DisLike_to_post)
// router.post('/addcomment/:id',AuthUser,postControler.Add_comment_to_post)
// router.post('/getallcomments/:id',AuthUser,postControler.get_comments_of_post)
// router.post('/deletepost',AuthUser,postControler.delete_post)
// router.post('/addbookmark/:id',AuthUser,postControler.Add_to_bookmark)







export default router