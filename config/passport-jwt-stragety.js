const passport=require('passport');
const JwtStartergy=require('passport-jwt').Strategy;
const JwtExtract=require('passport-jwt').ExtractJwt;


const User=require('../models/user');

let opts={
    jwtFromRequest :JwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey :'codeial'
}

passport.use(new JwtStartergy(opts,function(Jwtpayload,done){
      User.findById(Jwtpayload._id,function(err,user){
        if(err){console.log("error in finding user form jwt"); return;}
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
      });
}));


module.exports=passport;