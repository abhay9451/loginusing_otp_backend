const mongoose = require("mongoose");
//const uuidv1 = require('uuidv1');
const crypto = require('crypto');
//const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    Contect: {
        type: String,
       
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,

    },
   
    //  otp:{
    //     type: String,
    //     required: true,
    //  },
     
    

    //salt: String,
}, {
    timestamps: true,
});

// userSchema.virtual("password").set(function (password) {
//     //temp veriable
//     this._password = password;
//     //generate timestaps
//     this.salt = uuidv1();
//     //encrypt password

//     this.hashedPassword = this.encryptPassword(password);
// });
userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";

        try {
            return crypto.createHmac("sha256", this.salt).update(password).digest("hex");
        } catch (err) {
            return "";
        }
    },
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.password;
    },
}
module.exports = mongoose.model("User", userSchema);