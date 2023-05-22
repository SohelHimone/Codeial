const express=require('express');
const env=require('./config/environment');
const cookieparser=require('cookie-parser');
const app=express();
const port=4000;
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');

//installing cours lib for socket error
const cors=require('cors');
app.use(cors());
//import in session cookie
const session=require('express-session');
const passport=require('passport');
const Localpassport=require('./config/passport-local-stragey');
const Jwtpassport=require('./config/passport-jwt-stragety');
//require the google stargery
const passportGoogle=require('./config/passport-google-oauth-startergy');
// const SassMiddleware= require('')
const MongoStore= require('connect-mongo')(session);

// const Noty = require('noty');
const flash=require('connect-flash');
const flashmiddleware=require('./config/flashmiddleware');

//setting up the scoket.io for chat engine

const chatServer=require('http').createServer(app);
const chatSocket=require('./config/chatSocket.io').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is running on port 5000');

//setting up middleware by using urlencoded
app.use(express.urlencoded());
//using cookieparser
app.use(cookieparser());

app.use(express.static('./assets'));
app.use(expresslayout);
//connnecting to statics file of uploads to current directory of codeial
app.use('/uploads',express.static(__dirname +'/uploads'));
//setup mutiple css file in main layout css by using static
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//seting up view engine with ejs langauge
app.set('view engine','ejs');
app.set('views','./views');


//creating passport session in which cookies features are run and used by passport
app.use(session({
    name:'codeial',
    secret: env.session_cookie_key,
    saveUninitializted:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //creating new instance to store cookie session in database by using mongo-store
    store: new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect to mongo store');
        }
    )

}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAutheticatedUser);
//using flash
app.use(flash());
app.use(flashmiddleware.setflash);




//setting up passport to use session and intialize the passport to use it


//using express for route
app.use('/',require('./routes'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running Express: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});