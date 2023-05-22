const mongoose=require('mongoose');
const env=require('../config/environment');
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
const db=mongoose.connection;
// mongoose.connect('mongodb://localhost/codeial_development');

db.on('error',console.error.bind("this is erorr"));
db.once('open',function(){
    console.log("database connected")
});





module.exports=db;


// const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/codeial_db');
// const db=mongoose.connection;

// db.on('error',console.error.bind('this is erorr'));
// db.once('open',function(){
//     console.log("database connected sucessfully");
// });
// module.exports=db;
