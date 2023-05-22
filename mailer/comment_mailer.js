const nodemailer=require('../config/nodemailer');


module.exports.newComment=(comment)=>{

    console.log("inside new comment",comment.user.email);
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/comment.ejs');

    nodemailer.transporter.sendMail({
       from:'sohelhimone@gmail.com',
       to: comment.user.email,
       subject:"your comment published",
       html: htmlString
    },(err,info)=>{
       if(err){console.log('error in comment ',err); return;}
       console.log("meassgae sent",info);  
       return;
    });
}

