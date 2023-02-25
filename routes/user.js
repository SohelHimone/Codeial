const express=require('express');
const router=express.Router();
const usercontrol=require('../controller/usercontroller');
const postcontrol=require('../controller/usercontroller');
const passport=require('passport');



//geting data form usercontroller and rendering back
router.get('/profile',passport.checkAuthentication,usercontrol.profile);
router.get('/post',postcontrol.post);
router.get('/Sign_in',usercontrol.SignIn);
router.get('/Sign_up',usercontrol.SignUp);

//posting or creating user so post method use
router.post('/create',usercontrol.create);
// router.post('/create_session',usercontrol.createsession);


//creating router for createsession and using passport  as middleware to authneticate user if yes then return the callback function
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/Sign_in'})
,usercontrol.createsession);

router.get('/Sign_out',usercontrol.signout);


module.exports=router;