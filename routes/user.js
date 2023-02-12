const express=require('express');
const router=express.Router();

const usercontrol=require('../controller/usercontroller');
const postcontrol=require('../controller/usercontroller')

router.get('/profile',usercontrol.profile);
router.get('/post',postcontrol.post);




module.exports=router;