const express=require('express');
const router=express.Router();

const usercontrol=require('../controller/usercontroller');

router.get('/profile',usercontrol.profile);




module.exports=router;