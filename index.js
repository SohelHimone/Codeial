const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=4000;
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
//import in session cookie
const session=require('express-session');
const passport=require('passport');
const Localpassport=require('./config/passport-local-stragey');
// const SassMiddleware= require('')
// const MongoStore= require('connect-mongo')(session);

//setting up middleware by using urlencoded
app.use(express.urlencoded());
//using cookieparser
app.use(cookieparser());

app.use(express.static('./assets'));
app.use(expresslayout);

//setup mutiple css file in main layout css by using static
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//seting up view engine with ejs langauge
app.set('view engine','ejs');
app.set('views','./views');


//creating passport session in which cookies features are run and used by passport
app.use(session({
    name:'codeial',
    secret:"something",
    saveUninitializted:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //creating new instance to store cookie session in database by using mongo-store
    // store: new MongoStore(
    //     {
    //         mongooseConnection:db,
    //         autoRemove:'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect to mongo store');
    //     }
    // )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAutheticatedUser);




//setting up passport to use session and intialize the passport to use it


//using express for route
app.use('/',require('./routes'));
app.use('/posts',require('./routes/posts'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running Express: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});