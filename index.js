const express = require("express");
const{json, urlencoded} = express;
const mongoose =  require ("mongoose");
const cookieParser = require ("cookie-parser");
const expressValidator = require ("express-validator");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

//db
mongo_url =  "mongodb+srv://abhay:root@cluster1.xerhlau.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongo_url ,{
 //useNewUrlParser : true
}) .then (() => console.log("Db connected"))
.catch(err => console.log("db connection error",err));
//midde
app.use(json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: false}));
app.use(cookieParser());
app.use(expressValidator());
//routes
const userRoutes = require('./routes/auth_route');
app.use("/", userRoutes);

//port
const port = process.env.PORT || 8080

//lostener

 app.listen (port,() =>
console.log(`server is running on port ${port}`)
);