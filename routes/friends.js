const express=require('express');
const router=express.Router();

const friendshipcontroller= require('../controller/friendshipController');


router.post('/toggle',friendshipcontroller.togglefriend);

module.exports=router;