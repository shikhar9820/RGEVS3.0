var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/registration");
var votersList = require("../models/voters");
const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:
    {
        user: 'shikhar.kataruka87@gmail.com',
        pass: 'shikhar97'
    }
});


//AUTH ROUTES
router.get("/", function (req, res) {
    res.render("index/landing");

});
router.get("/schoolSignUp", function (req, res) {
    res.render("index/schoolSignUp");

});
router.get("/voterSignUp", function (req, res) {
    res.render("index/voterSignUp");

});
//School Registration Routes
router.get("/signup", function (req, res) {
    res.render("index/signup");
});
router.post("/voterSignup", function (req, res) {
    var voter = req.body.VoterId;
    var voterCode = voter.slice(0, 7);
    votersList.find({ code: voterCode }, function (err, cb) {
        if (err) {
            console.log(err);
        }
        else {
            if (cb.voterList.includes(voter)){
                  res.redirect('/elect?voterId='+ voter);//change
            }
            else {
                //create another page for not authVoter
                  res.redirect("/voterSignUp");
            }
        }
    });
});

//adminLoginLogic
/*





*/
router.post("/schoolSignup", function (req, res) {
    var users = req.body.username;
    var x = JSON.stringify(req.body);
    var mailOption = {
        from: 'shikhar.kataruka87@gmail.com',
        to: 'shikhar.kataruka89@gmail.com',
        subject: 'hi',
        text: "HI"
    };
    transporter.sendMail(mailOption, function (err, info) {

        if (err) {
            console.log(err);
        }
        else {
            console.log("Email Sent");
            res.render("thankyou.ejs");
        }
    })



});

//Login Routes
router.get("/login", function (req, res) {
    res.render("index/login");
});

router.post("/login", passport.authenticate(
    "local",
    {
        successRedirect: "/poll",
        failureRedirect: "/login"
    }),
    function (req, res) {
        //res.redirect("/poll");

        //authentication login
    });

router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

//=======middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};
//=======================================================//
module.exports = router;

