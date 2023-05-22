const Post=require('../models/postschema');
const Comment=require('../models/commentschema');
const Like=require('../models/likeSchema');

// module.exports.create=function(req,res){
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){console.log("error in creating Post"); return;}
//         if(req.xhr){
//             return res.status(200).json({
//                 data:{
//                     post:post
//                 },
//                 message:"post created!!"
//             });
//         }
//         return res.redirect('back');
// });
// }

//by async await method
module.exports.create= async function(req,res){
     
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id});

            if(req.xhr){

                // if we want to populate just the name of the user (if we not want to send the password in the API), this is how we do it!
                post = await post.populate('user');
                return res.status(200).json({
                    data:{
                        post:post
                    },
                    message:"post created!!"
                });
            }
            return res.redirect('back');

    }catch(err){
        return res.redirect('back');
    }

}


// module.exports.destroy=function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         if(post.user==req.user.id){
//             post.remove();

//             Comment.deleteMany({post:req.params.id},function(err){

//                 if(req.xhr){
//                     return res.status(200).json({
//                         data:{
//                             post_id:req.params.id
//                         },
//                         message:"post deleted!!"
//                     });
//                 }
//                 return res.redirect('back');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }



module.exports.destroy=async function(req,res){
     try{
        let post= await Post.findById(req.params.id);
        if(post.user==req.user.id){
            //delete all likes form post as well as comment
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in: post.comments}});

            post.remove();

           await Comment.deleteMany({post:req.params.id});

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.params.id
                        },
                        message:"post deleted!!"
                    });
                }
                return res.redirect('back');
            
        }
        else{
            return res.redirect('back');
        }
     }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

    
   
}