const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');


//using passport to setup authetication 
passport.use(new LocalStrategy({
    usernameField:'email'
   },
   function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){console.log('Error in finding user-->passport'); 
            return done(err);
        }
            if(!user || user.password!=password){
                console.log('Unable to find user');
                return done(null,false);
            }
            return done(null,user);
        });
   }
));


//serialize to user to check which things or key is to kept in cookies

passport.serializeUser(function(user,done){
     return done(null,user);
});



//deserialize to user from the key in the cookies(to encrypt the key that which actally user is requesting to browser)

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
           if(err){
            console.log('Error in finding user-->passport'); 
            return done(err);
           }
           return done(null,user);
    })
});


passport.checkAuthentication=function(req,res,next){
    //if users is authenticated then  pass it to next funtion (which is a controller action )
    if(req.isAuthenticated()){
        return next();

    }
    //if users fail to authicated then send to sign_in page again
    
    return res.redirect('/users/Sign_in');
  
    
}


passport.setAutheticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
       
    }
    next();
    
}

module.exports=passport;