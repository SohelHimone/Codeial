// const user = require('../models/user');
const User=require('../models/user');

module.exports.profile=function(req,res){
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
    return res.render('user_profile',{
        title:"Profile",
    });
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
        return res.redirect('/users/profile');
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
    //by manually first we check pasword is it match or not?
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
                if(err){console.log('error in finding user'); return;} 
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
    console.log(req.user);
     return res.redirect('/users/profile');
}


//creating action for Signout/logout
module.exports.signout=function(req,res){
    req.logout((error) => {
        if (error) {
          console.log('err')
          return ;
        }
        return res.redirect("/");
      });
}







