const User = require("../models/user_model");
exports.register = async(req,res) => {
    // usr already exist
     const ContectExists = await User.findOne({
        Contect: req.body.Contect,
     });
     const emailExists = await User.findOne({
        email: req.body.email,

     });
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
     // if new user create 
     const user = new User (req.body);
     await user.save();

     res.status(201).json({
        message: "Signup successfull",
     });
};