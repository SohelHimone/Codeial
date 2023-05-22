const express=require('express');
const router= express.Router();


//telling router to use index of v1
router.use('/v1',require('./v1'));

module.exports=router;