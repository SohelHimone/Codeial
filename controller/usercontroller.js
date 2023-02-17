const user = require('../models/user');
const User=require('../models/user');

module.exports.profile=function(req,res){
    // return res.end('<h1>this user Profile controller</h1>')
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log('erorr in finding user_id by cookies'); return;}
            if(user){
                return res.render('user_profile',{
                    title:"Profile",
                    user:user
                });
            }
            return res.redirect('/users/Sign_in');
            
        });
    }
    else{
        return res.redirect('/users/Sign_in');
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
    return res.render('user_sign_in',{
        title:"Sign In"
    })
}

module.exports.SignUp=function(req,res){
     return res.render('user_sign_up',{
        title:"Sign_Up"
     })
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
         if(err){console.log('error in finding user'); 
         return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finding user'); return;} 
                return res.redirect('/users/Sign_in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.createsession = function(req,res){
     //find user by verfiying by email
     User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the users'); return ;}
        //if user find then match the password
        if(user){
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            //if user not found 
            return res.redirect('back');
        }
        
     })
}





