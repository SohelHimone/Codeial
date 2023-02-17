const express=require('express');
const router=express.Router();
const usercontrol=require('../controller/usercontroller');
const postcontrol=require('../controller/usercontroller')



//geting data form usercontroller and rendering back
router.get('/profile',usercontrol.profile);
router.get('/post',postcontrol.post);
router.get('/Sign_in',usercontrol.SignIn);
router.get('/Sign_up',usercontrol.SignUp);

//posting or creating user so post method use
router.post('/create',usercontrol.create);
router.post('/create_session',usercontrol.createsession);

module.exports=router;