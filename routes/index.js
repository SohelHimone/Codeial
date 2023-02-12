const express=require('express');
const router=express.Router();

const homeControl=require('../controller/homecontroller');

console.log("router is here");


router.get('/',homeControl.home);
router.use('/users',require('./user'))
router.use('/post',require('./user'))






module.exports=router;