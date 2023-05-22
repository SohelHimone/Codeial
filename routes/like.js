const express=require('express');
const router=express.Router();
const likecontoller=require('../controller/like_controller');

router.post('/toggle',likecontoller.togglelike);


module.exports=router;