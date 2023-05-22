const Post=require('../../../models/postschema');
const comment =require('../../../models/commentschema');

module.exports.index=async function(req,res){
    let posts= await Post.find({}).sort('-createdAt')
        .populate('user').populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });
    return res.json(200,{
        message:"ok",
        posts:posts
    });
}


module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();

            await comment.deleteMany({post:req.params.id});

                
            return res.json(200,{
                message:"post deleted with comment"
            });

        }else{
            return res.json(401,{
                message:"you cannot delete the post"
            })
        }
    }
    catch(err){
        return res.json(500,{
            message:"internal server error"
        });
    }
    
           
    
       
    }
