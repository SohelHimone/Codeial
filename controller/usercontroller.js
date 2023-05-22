// const user = require('../models/user');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const Friendship=require('../models/friendshipSchema');

module.exports.profile= async function(req,res){
    // return res.end('<h1>this user Profile controller</h1>')
    //this code is for manual authecitating here we find user id in cookie and then redirect it to profile page
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id,function(err,user){
    //         if(err){console.log('erorr in finding user_id by cookies'); return;}
    //         if(user){
    //             return res.render('user_profile',{
    //                 title:"Profile",
    //                 user:user
    //             });
    //         }
    //         return res.redirect('/users/Sign_in');
            
    //     });
    // }
    // else{
    //     return res.redirect('/users/Sign_in');
    // }
    

    //this code is normal just to render profile page
    // User.findById(req.params.id,function(err,user){
    //         console.log(user)
    //         if(user){
    //             return res.render('user_profile',{
    //                 title:"Profile",
    //                 profile_user:user
    //             });
    //         }
    //         return res.redirect('/users/Sign_in');

    // });

    try{
        let user = await User.findById(req.params.id);
     
        let friend1 =await Friendship.findOne({from_user:req.params.id, to_user:req.user.id});
        let friend2 =await Friendship.findOne({from_user:req.user.id, to_user:req.params.id});
        
        let friends=false ;
        if(friend1 || friend2)
         friends=true;
        res.render('user_profile',{
                 title:'profile-page',
                 profile_user:user,
                 friends:friends
                
                 });
        }catch(err){
                 console.log(err);
        }

    
}


module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }
    // else{
    //     return res.status(401).send("unAuthorized");
    // }

    //async and await method
    if(req.user.id==req.params.id){
       try{
         let user=await User.findById(req.params.id);
         User.useravatar(req,res,function(err){
            if(err){console.log('*** ,multer erorr',err)}

            // console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;
            if(req.file){
                if(user.avatar){
                   fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
                user.avatar=User.avatarpath +'/'+ req.file.filename;
            }
            user.save();
            return res.redirect('back');
         });
       }catch(err){
           return res.redirect('back');
       }
    }
    else{
        return res.status(401).send("unAuthorized");
    }
    

}



module.exports.post=function(req,res){
    // return res.end('<h1>this user post controller</h1>')
    return res.render('home',{
        title:"Post",
        msg:('this user Post controller')
    });
}

module.exports.SignIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in',{
        title:"Sign In"
    })
}

module.exports.SignUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
     return res.render('user_sign_up',{
        title:"Sign_Up"
     })
}

module.exports.create=function(req,res){
    //by manually first we check password is it match or not?
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    //now 2nd if passwords match then we find particular user by its email ,so there could be 2 condition whether we get user or err
    User.findOne({email:req.body.email},function(err,user){
        //this if for err
         if(err){console.log('error in finding user'); 
         return;
        }
         //now suppose we dont get user then we create new user by create function were we use Schema to create new user
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user'); return;} 
                return res.redirect('/users/Sign_in');
            })
        }
        //suppose user not match or password fails or there is no user so we redirect it to sign_in page back
        else{
            return res.redirect('back');
        }
    })
}

//here we creating session manually(means we putting user_id/user details in cookie to use it as user identity when we try to sign_in)
// module.exports.createsession = function(req,res){
//      //find user by verfiying by email
//      User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log('error in finding the users'); return ;}
//         //if user find then match the password
//         if(user){
//             if(user.password!=req.body.password){
//                 return res.redirect('back');
//             }
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');
//         }
//         else{
//             //if user not found 
//             return res.redirect('back');
//         }
        
//      })
// }

//here we use Passport.js for creating seesion
module.exports.createsession = function(req,res){
    req.flash('success','Logged In successfully');
    console.log(req.user);
     return res.redirect('/');
}


//creating action for Signout/logout
module.exports.signout=function(req,res){
    req.logout((error) => {
        if (error) {
          console.log('err')
          return ;
        }
        req.flash('success','You have Logged Out!!');
        return res.redirect("/");
      });
}





module.exports.resetpassword=function(req,res){
    
}





