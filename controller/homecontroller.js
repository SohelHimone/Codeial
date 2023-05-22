const Post=require('../models/postschema');
const User=require('../models/user');
const Friendship = require('../models/friendshipSchema');
//this controller is normally we write
// module.exports.home=function(req,res){
//     // return res.end("<h1>Express homecontroller is here</h1>");
//     //this is to find the user posts from db 
//     // Post.find({},function(err,posts){
//     //         // if(err){console.log('error in finding user'); return;}
//     //         return res.render('home',{
//     //             title:"Home",
//     //             posts: posts
//     //         });
//     // })
//     //to find user whole data in db we use populate property 
//     Post.find({}).populate('user')
//     .populate({
//         path:'comment',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec(function(err,posts){
//         // if(err){console.log('error in finding user'); return;}
        
//         User.find({},function(err,users){
//             // if(err){console.log('error in finding user'); return;}
            
//                 return res.render('home',{
//                     title:"Home",
//                     posts: posts,
//                     all_users:users
//                 });
            
//         });
        
    
//     })

    
   
// }

//by async and await we can write better code
module.exports.home= async function(req,res){
    try{
        let posts= await Post.find({}).sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');
  
        let friends = await Friendship.find({ from_user: req.user });
        console.log(friends);
        for (let i = 0; i < friends.length; i++) {
          await friends[i].populate('to_user');
        }
        //console.log('after *********');
        //console.log(friends);
        let users=await User.find({});
        return res.render('home',{
            title:"Home",
            posts:posts,
            all_users:users,
            friends:friends
        });

        
    }
    
    catch(err){
         console.log("erroror",err);
         return;
    }
    
    
}


