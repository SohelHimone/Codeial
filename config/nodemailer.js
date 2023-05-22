const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('../config/environment');



let transporter= nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a1443b340aa270",
      pass: "cc45d35e27db3c"
    }
});


let renderTemplate=(data,relativepath)=>{
    let mailHtml;
    ejs.renderFile(
         path.join(__dirname,'../views/mailer',relativepath),
         data,
         function(err,template){
            if(err){
                console.log("error in rendering template",err);
                return;
            }
            mailHtml=template;
         }
    )
    return mailHtml;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}

