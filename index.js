const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=4000;
const expresslayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
// const { urlencoded } = require('express');

//setting up middleware by using urlencoded
app.use(express.urlencoded());
//using cookieparser
app.use(cookieparser());

app.use(express.static('./assets'));
app.use(expresslayout);

//setup mutiple css file in main layout css by using static
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//using express for route
app.use('/',require('./routes'));

//seting up view engine with ejs langauge
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running Express: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});