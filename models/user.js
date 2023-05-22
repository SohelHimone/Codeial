const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const Avatar_path=path.join('/uploads/users/avatars');

const userschema=new mongoose.Schema({
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     name:{
        type:String,
        required:true
     },
     avatar:{
       type:String
     },
     resetToken:{
       type:String
     },
     resetPasswordToken :{
      type:String
     },
     friendships:[
      {
      type:mongoose.Schema.Types.ObjectId,
        ref:'Friendship'
     }
    ]
  
  
   //   timestaps:true
},

{
   timestamps:true
});
let storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.join(__dirname,'..',Avatar_path));
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix)
   }
 });

//static methods
userschema.statics.useravatar=multer({storage:storage}).single('avatar');
userschema.statics.avatarpath=Avatar_path;

const User=mongoose.model('User',userschema);
module.exports=User;