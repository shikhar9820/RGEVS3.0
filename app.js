//============//
//Dependencies//
//============//
var express               =require("express");
var methodOverride        = require("method-override");
var mongoose              =require("mongoose");
var passport              =require("passport");
var bodyParser            =require("body-parser");
var user                  =require("./models/registration");
//var posts                 =require("./models/post");
//var voter                 =require("./models/voter");
var candidate             =require("./models/candidate");
var polls                 =require("./models/poll");
var localStrategy         =require("passport-local");
var passportLocalMongoose =require("passport-local-mongoose");
var app                   =express();
var multer                =require("multer");
var pollRoutes            =require("./routes/poll");
var indexRoutes           =require("./routes/index");
var voterRoutes           =require("./routes/voter");
//var $                     = require("jQuery");


//=======================//
//Mongoose configurations//
//=======================//
 mongoose.set("useNewUrlParser", true);
 mongoose.set("useUnifiedTopology", true);
 mongoose.connect("mongodb://localhost:27017/vote",{useNewUrlParser: true});

 //=====================//
 //Express configurations
 //=====================//
 app.set("view engine","ejs");
 app.use(bodyParser.urlencoded({extended: true}));
 app.use('/uploads' ,express.static('uploads'));
 app.use(methodOverride('_method'));

   //=======================//
  //Passport Configuration=//
 //=======================//
 app.use(require("express-session")({
    secret:"I am hot",
    resave:false,
    saveUninitialized: false
}));

 app.use(passport.initialize());
 app.use(passport.session());
 passport.serializeUser(user.serializeUser());
 passport.deserializeUser(user.deserializeUser());
 passport.use(new localStrategy(user.authenticate()));


 
 app.use(function(req,res,next){
     res.locals.currentUser=req.user; //it basically passes a single variable to every route
     next();
 });

 


//=======================//
//Route Configuration//
//=======================//

app.use(indexRoutes);
app.use(pollRoutes);
app.use(voterRoutes);

//=========================================================================================================

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make


















