const express=require('express');
const router=express.Router();

const homeControl=require('../controller/homecontroller');

console.log("router is here");


router.get('/',homeControl.home);
router.use('/users',require('./user'));
router.use('/post',require('./posts'));
router.use('/comment',require('./comments'));
router.use('/likes',require('./like'));
router.use('/friends',require('./friends'));

//telling router to use api folder
router.use('/api',require('./api'));





module.exports=router;