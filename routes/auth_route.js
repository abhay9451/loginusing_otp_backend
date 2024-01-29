const express = require('express');
const router = express.Router();
const user = require("../models/user_model")
//const nodemailer = require("nodemailer");
//const jwt = require("jsonwebtoken");
//import cont
const {register,Login,logout,getLoggedInUser} = require("../controllers/auth");
//valid
const{userRegisterValidator,userById} = require ("../middlewares/validater");
const{verifyToken} = require ("../middlewares/jwt_auth");
//api routes

router.post("/register",userRegisterValidator, register);
router.post("/login",Login);
router.get("/logout",logout);
//router.get("/user",verifyToken,userById, getLoggedInUser);

const generateOTP = () => {
    console.log(Math.floor(100000 + Math.random() * 900000).toString());
 };
 router.post ("/generateotp/", async (req,res) => {
    const email = req.body;

    const otp =generateOTP();

   
    user.findById ({email}, {otp}, {new: true}, (err,user) => {
        if(generateOTP=true){
            console.log("Otp generated successfully", user);
            res.status(202).json({otp});
            
        }else{
            console.log(err)
            console.log("somethig went wrong",err)
            res.status(404);
        }
    }
    );
 });


module.exports = router;