const Comment=require('../models/commentschema');
const Post=require('../models/postschema');
const commentsMailer=require('../mailer/comment_mailer');
const Like = require('../models/likeSchema');

// const queue=require('../config/kue');
// const commentEmailWorker=require('../workers/comment_emails_worker');

module.exports.create=async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);

            
            // comment = await comment.populate([{
            //     path:'user',
            //     select:'name'

            // },{
            //     path:'user',
            //     select:'email'
            // }])

            // comment=await comment.populate('user','name email');
            // console.log(comment)
            // commentsMailer.newComment(comment);

            // let job= queue.create('emails',comment).save(function(err){
            //     if(err){
            //         console.log('error in creating or adding jobs in queue',err);
            //         return;
            //     }
            //     console.log('job enqueued',job.id);
            // });

            if (req.xhr){
            //    comment=await comment.populate('user', 'name');    
    
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: "comment created"
                });
            }


            // req.flash('success', 'Comment published!');

            return res.redirect('/');
        }
    }catch(err){
        // req.flash('error', err);
        console.log("error in controller in comment creating",err);
        return res.redirect('back');

    }
    //  post.findById(req.body.post,function(err,post){
    //     if(post){
    //         comment.create({
    //             content:req.body.content,
    //             post:req.body.post,
    //             user:req.user._id
    //         },function(err,comment){
    //             if(err){console.log("error in creating comment"); return;}

    //             post.comment.push(comment);
    //             post.save();

    //             res.redirect('back');
    //         });
    //     }
    //  });

}



module.exports.destroy = async function(req,res){
    
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment){
            if(comment.user==req.user.id){

                let postId=comment.post;
                comment.remove();
                let post=await Post.findByIdAndUpdate(postId,{ $pull : {comments:req.params.id}});

                await Like.deleteMany({likeable:comment._id,onModel:'Comment'});



                if(req.xhr){
            
                    return res.status(200).json({
                        data:{
                            // both will work
                            // post_id:post._id
                            comment_id:req.params.id
                        },
                        message:"Comments deleted via Ajax!"
                    });
                }

                req.flash("success","Comment deleted!");
                return res.redirect('back');
            }
            else{

                req.flash("error","You are unauthorized to delete this comment!");
                // console.log("You are unauthorized to delete this comment");
                return res.redirect('back');
            }
        }
        else{
            console.log("The comment to be deleted is not found in the databse");
            return;
        }
    }catch(err){
        req.flash('error',err);
        // console.log("Error",err);
        return res.redirect('back');
    }

}




    





    // comment.findById(req.params.id,function(err,com){
    //     if(com.user==req.user.id){
    //         let postid=comment.post
    //         com.remove();
    //         post.findByIdAndUpdate(postid,{ $pull:{comment:req.params.id}},function(err){
    //             return res.redirect('back');
    //         });
    //     }    
    //     else{
    //         return res.redirect('back');
    //     }
    // })



