const express=require('express');
const router=express.Router();
const userapicontroller=require('../../../controller/api/v1/userapi');

router.post('/create-session',userapicontroller.createsession);


module.exports=router;