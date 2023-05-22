const express=require('express');
const router=express.Router();
const commentcontrol=require('../controller/commentcontroller');
const passport=require('passport');

router.post('/create',passport.checkAuthentication,commentcontrol.create);
router.get('/destroy/:id',passport.checkAuthentication,commentcontrol.destroy);


module.exports=router;