var express = require("express");
var router  = express.Router();
var passport = require("passport");                                                                                                                                                                                                                                                                                                                                                                                                                                                       
var user = require("../models/registration");


//AUTH ROUTES

//School Registration Routes
router.get("/signup", function(req,res)
{
   res.render("index/signup");
});
router.post("/voterSignup",function(req,res){
    var users=req.body.username;
    var r=req.body.role;
    //r=r.toUpperCase();
    var coder=users.slice(0,4);
    var newUserVoter = new user ({username :users,code:coder,role:r});
    console.log(newUserVoter);
    var newUserSchool= new user ({username :users,role:r,code:req.body.code});
    console.log(newUserSchool);

    user.register(newUserVoter,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("index/signup");
        }
        passport.authenticate("local")(req,res,function(){
          
            res.redirect("/elect");
        });
    });


});

router.post("/schoolSignup",function(req,res){
    var users=req.body.username;
    var r=req.body.role;
    //r=r.toUpperCase();
    var coder=users.slice(0,4);
    var newUserVoter = new user ({username :users,code:coder,role:r});
    console.log(newUserVoter);
    var newUserSchool= new user ({username :users,role:r,code:req.body.code});
    console.log(newUserSchool);
    

    console.log("hi");

    console.log("hi");
user.register(newUserSchool,req.body.password,function(err,user){
    if(err){
        console.log(err);
        return res.render("index/signup");
    }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/poll");
    });
});

});
//Voter Registration Routes
router.get("/voter", function(req,res)
{
   res.render("index/voter");
});
router.post("/voter",function(req,res)
{
    var user =req.body.username;
    var code  = user.slice(0,4);
    var newUser = new register({username:user,code:code});
    voter.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("index/voter");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/polls");
        });
    });
});
//Login Routes

router.get("/login",function(req,res){
    res.render("index/login");
});

router.post("/login",passport.authenticate(
    "local",
    {
        successRedirect: "/poll",
        failureRedirect: "/login"
    }), 
    function(req,res)
{
    //res.redirect("/poll");

    //authentication login
});

router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

//=======middleware

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//=======================================================//
module.exports=router;

