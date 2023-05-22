const passport=require('passport');
const googleStratregy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');

//telling passport to use new googlestratregy for autheication of user by options of googlesign
passport.use(new googleStratregy({
     clientID:"621993100124-tifn5l8c26aun755n86t5qe30l3tpns9.apps.googleusercontent.com",
     clientSecret:"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",
     //this is the callback function or its url where google will send us user details
     callbackURL:"http://localhost:4000/users/auth/google/callback"
},
   function(accesstoken,refreshtoken,profile,done){
    //finding the user in which their are mutiple emails can be in google so match them with our db
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('errorr in finding user in google stargetry'); return;}
            console.log(profile);
            //if found the user in our db the return it
            if(user){
                return done(null,user);
            }else{
                //if not found in our db then we will create it and redirect it to sign in 
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },
                function(err,user){
                    if(err){console.log('errorr in creating  user in google stargetry'); return;}
                    return done(null,user);
                });
            }

      
    });
   }
));

module.exports=passport;