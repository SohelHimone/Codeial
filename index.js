const express=require('express');
const router = require('./routes');
const app=express();
const port=4000;

//using express for route
app.use('/',require('./routes'));

//seting up view engine with ejs langauge
app.set('view engine','ejs');
app.set('views','./view');


app.listen(port,function(err){
    if(err){
        console.log(`Error in running Express: ${err}`);
    }
    console.log(`Server is running on port :${port}`);
});