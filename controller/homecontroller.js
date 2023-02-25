 const Post=require('../models/postschema');
module.exports.home=function(req,res){
    // return res.end("<h1>Express homecontroller is here</h1>");
    // Post.find({},function(err,posts){
    //         // if(err){console.log('error in finding user'); return;}
    //         return res.render('home',{
    //             title:"Home",
    //             posts: posts
    //         });
    // })
    Post.find({}).populate('user').exec(function(err,posts){
        // if(err){console.log('error in finding user'); return;}
        return res.render('home',{
            title:"Home",
            posts: posts
        });
    
    })

   
}

