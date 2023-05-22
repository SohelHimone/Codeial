const express=require('express');
const router=express.Router();
const usercontrol=require('../controller/usercontroller');
const postcontrol=require('../controller/usercontroller');
const passport=require('passport');
const forgotpasswordcontroller=require('../controller/forgotpasswordcontroller')




//geting data form usercontroller and rendering back
router.get('/profile/:id',passport.checkAuthentication,usercontrol.profile);
router.post('/update/:id',passport.checkAuthentication,usercontrol.update);

router.get('/post',postcontrol.post);
router.get('/Sign_in',usercontrol.SignIn);
router.get('/forgotpassword',forgotpasswordcontroller.forgotpassword);
router.post('/submitform', forgotpasswordcontroller.submitform);
router.get('/Sign_up',usercontrol.SignUp);
router.get('/user_profile/:id',usercontrol.profile)

router.get('/resetpassword/:token',forgotpasswordcontroller.getResetPassword);
router.post('/reset_password/:token',forgotpasswordcontroller.updatepassword);

//posting or creating userpost so post method use
router.post('/create',usercontrol.create);
// router.post('/create_session',usercontrol.createsession);


//creating router for createsession and using passport  as middleware to authneticate user if yes then return the callback function
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/Sign_in'})
,usercontrol.createsession);

router.get('/Sign_out',usercontrol.signout);


//routing for google startergy
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/Sign_in'}),usercontrol.createsession);


module.exports=router;