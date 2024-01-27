const express = require('express');
const router = express.Router();
//import cont
const {register} = require("../controllers/auth");
//valid
const{userRegisterValidator} = require ("../middlewares/validater")
//api routes

router.post("/register",userRegisterValidator, register);

module.exports = router;