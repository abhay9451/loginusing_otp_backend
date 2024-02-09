const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt= require('bcrypt');
const {createSecretToken} =  require("../unit/SecretToken");
require ("dotenv").config();


exports.register = async(req,res) => {
    // usr already exist
     const ContectExists = await User.findOne({
        Contect: req.body.Contect,
     });
     const emailExists = await User.findOne(

     });
      // const otpExists = await User.findOne({
      //    otp : req.body.otp,
      // });
     if(ContectExists) {
        return res.status(403).json({
            error: "phone number is taken",

        });
     }
     if(emailExists) {
        return res.status(403).json({
            error: "Email is taken",
        });
     }
     if(otpExists) {
      return res.status(403).json({
         error: "otp error",
      });
     }
     // if new user create 








     onst user = new User (req.body);
     await user.save();

     res.status(201).json({
        message: "Signup successfull",
     });
};

exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
    //    res.cookie("token", token, {
    //     //  withCredentials: true,
    //      httpOnly: true,
    //    });

       res.cookie("jwt", token, { expire: new Date() + 9999, httpOnly: true });


       res.status(201).json({ message: "User logged in successfully", success: email });
       next()                                                              
    } catch (error) {
      console.error(error);
    }
  }

  exports.logout = (req, res) => {
    // Clear the JWT cookie
    res.clearCookie("jwt");

    return res.status(200).json({
        message: "Logout successful",
    });
};



