const Like= require('../models/likeSchema');
const Post=require('../models/postschema');
const Comment=require('../models/commentschema');



module.exports.togglelike= async function(req,res){
    try{
      //like/togglelike/?id=asdw=Post or Comment
      let likeable;
      let deleted=false;

      if(req.query.type=="Post"){
           likeable= await Post.findById(req.query.id).populate('likes');
      }else{
        likeable= await Comment.findById(req.query.id).populate('likes');
      }
      //check whether like is made already or not
      let existingLike=await Like.findOne({
        likeable: req.query.id,
        onModel: req.query.type,
        user: req.user._id
      });
      if(existingLike){
         likeable.likes.pull(existingLike._id);
         likeable.save();

         existingLike.remove();

         deleted=true;

      }else{
        let newLike= await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel:req.query.type
            
        });
        likeable.likes.push(newLike._id);
        likeable.save();

      }
      

      return res.status(200).json({
        message:'like created!!',
        data:{
            deleted:deleted
        }
      });

      // return res.redirect('back');
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'internal server error!!'
        })
    }
}


