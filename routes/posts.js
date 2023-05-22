const express=require('express');
const router=express.Router();
const postcontrol=require('../controller/postcontroller');
const passport=require('passport');

router.post('/create',passport.checkAuthentication,postcontrol.create);
router.get('/destroy/:id',passport.checkAuthentication,postcontrol.destroy);


module.exports=router;