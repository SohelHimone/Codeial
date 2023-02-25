const express=require('express');
const router=express.Router();
const postcontrol=require('../controller/postcontroller');


router.post('/create',postcontrol.create);


module.exports=router;