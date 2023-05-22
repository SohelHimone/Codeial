const User=require('../models/user');
const crypto=require('crypto');
const nodermailer=require('../config/nodemailer');


module.exports.forgotpassword=function(req,res){
  return res.render('forgotpassword',{
    title:"forgot password",
});
}

module.exports.submitform=async function(req,res){
  const {email}=req.body
  console.log(email);
  try{
    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
      console.log('errors', 'No user with that email address exists');
      return res.redirect('/');
    }

    // Generate a new password reset token and expiration time
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetPasswordToken = Date.now() + 3600000; // Token expires in 1 hour

    // Save the updated user object to the database
    await user.save();

    // Send a password reset email to the user
    // const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //   user: "a1443b340aa270",
    //   pass: "cc45d35e27db3c"
    // }
    // });
    const resetURL = `http://localhost:4000/users/resetpassword/${token}`;
    
    const mailOptions = {
      from: 'sohelhimone@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      text: `Please click on the following link to reset your password: ${resetURL}`,
      html: `<p>Please click on the following link to reset your password:</p><a href="${resetURL}">Reset Password</a>`,
    };
    await nodermailer.transporter.sendMail(mailOptions)

    console.log('success', 'An email has been sent with further instructions');
    res.redirect('back');
  } catch (error) {
    console.log(error);
    req.flash('errors', 'Something went wrong');
    res.redirect('/');
  }
};


module.exports.getResetPassword = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user with the provided reset token and check if it is still valid
    const user = await User.findOne({
      resetToken: token,
      resetPasswordToken: { $gt: Date.now() },
    });
    if (!user) {token
      console.log('errors', 'Invalid or expired password reset ');
      return res.redirect('/users/forgotpassword');
    }

    res.render('reset_password', {
      title: 'Reset Password',
      token,
      errors: req.flash('errors'),
    });
  } catch (error) {
    console.log(error);
    req.flash('errors', 'Something went wrong');
    res.redirect('/users/forgotpassword');
  }
};


module.exports.updatepassword= async function(req, res){
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find the user with the provided reset token and check if it is still valid
    const user = await User.findOne({
      resetToken: token,
      resetPasswordToken: { $gt: Date.now() },
    });
    if (!user) {
      console.log('errors', 'Invalid or expired password reset token');
      return res.redirect('/users/forgotpassword');
    }

    // Update the user's password and reset the resetToken and resetPasswordToken
    user.password = password;
    user.resetToken = null;
    user.resetPasswordToken = null;
    await user.save();

    // Redirect the user to the login page
    res.redirect('/users/Sign_in');
  } catch (error) {
    console.log(error);
    req.flash('errors', 'Something went wrong');
    res.redirect(`/resetpassword/${token}`);
  }
}


