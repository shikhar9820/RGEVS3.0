var express   = require("express");
var router    = express.Router();
var candidate = require("../models/candidate");
var polls     = require("../models/poll");
var multer    = require("multer");

//===============//
//Multer Config//
//==============//
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage })

//============//
//Landing Route -This route Will direct to the option page given to the user for making or creating a vote
//===========//




//============//
//Activate Route
//===========//
router.get("/activate/:id/edit", schoolLoggedIn, function (req, res) {
    polls.findById(req.params.id, function (err, flag) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index/edit", { polls: flag });
        }
    });
});
router.put("/activate/:id", schoolLoggedIn, function (req, res) {
    let count = req.body.count;
    let voterList = [];
    var x = req.user.code;
    for (var i = 0; i < count; i++) {
        var y = x + i;
        voterList[i] = y;
    }
    polls.findByIdAndUpdate(req.params.id, { voter: voterList, flag: true, startDate: new Date() }, function (err, update) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/poll");
        }
    });

});
//============//
//poll Page Route- This is the first page a user i.e school sees once it is logged in.
//===========//
router.get("/poll", schoolLoggedIn, function (req, res) {

    polls.find({}, function (err, polls) {
        if (err) {
            console.log("ERROR");
        } else {

            res.render("index/poll", { polls: polls, currDate: new Date() });
        }
    });

});

router.post("/poll", schoolLoggedIn, function (req, res) {
    console.log(req.poll);
    var newPoll = { poll: req.body.poll, authorId: req.user._id, startDate: new Date(), code: req.user.code };
    polls.create(newPoll, function (err, poll) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/poll");
        }
    });
});

//============//
//Polling Routes-- There are three routes 
//                      1.option to add new posts 
//                      2.displaying all the added post 
//                      3.handling post request for new post
//===========//

//router.get("/post/new",schoolLoggedIn,function(req,res){
//  res.render("posts/newpost",{currentUser:req.user});
//});
router.get("/post/:id", schoolLoggedIn, function (req, res) {
    var pollIds = req.params.id;

    polls.findById(req.params.id, function (err, posts) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("posts/posting", { posts: posts.post, pollId: pollIds });
        }
    });

});

router.put("/post/:id", schoolLoggedIn, function (req, res) {
    var x = req.params.id;
    polls.findByIdAndUpdate(req.params.id, { "$push": { "post": req.body.posting } }, function (err, update) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/post/" + x);
        }
    });

});


//============//
//House are three routes
//                      1.option to add new posts
//                      2.displaying all the added post
//                      3.handling post request for new post
//===========//

router.get("/house/:id", schoolLoggedIn, function (req, res) {
    var pollIds = req.params.id;

    polls.findById(req.params.id, function (err, houses) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("houses/house", { houses: houses.house, pollId: pollIds });
        }
    });

});

router.put("/house/:id", schoolLoggedIn, function (req, res) {
    var x = req.params.id;
    polls.findByIdAndUpdate(req.params.id, { "$push": { "house": req.body.house } }, function (err, update) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/house/" + x);
        }
    });

});


//============//
//Candidates Routes- This contains three routes== 1. Candidate page   2. Adding a new candidate form  3. Post request  for adding candidate
//===========//


router.get("/candidate/new/:id", schoolLoggedIn, function (req, res) {
    var x = req.params.id;

    polls.findById(req.params.id, function (err, poll) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("candidate/newcandidate", { houses: poll.house, posts: poll.post, pollId: x });
        }
    });

});
router.post("/candidate/:id", upload.single('productImage'), function (req, res) {
    console.log(req.body);
    var name  = req.body.name;
    var post  = req.body.post;
    var house = req.body.house;
    var image = req.file.path;
    var po    = req.params.id;
    console.log(po);
    console.log(image);
    var newcandidate = { id: po, name: name, post: post, house: house, image: image };

    candidate.create(newcandidate, function (err, candidate) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("hi1");

            res.redirect("/candidate/new/" + po);
        }
    });
});

router.get("/candidate/:id", schoolLoggedIn, function (req, res) {
    candidate.find({ id: req.params.id }, function (err, candidates) {
        if (err) {
            console.log(err);}
        else {
            res.render("candidate/candidate", { candidate: candidates });
        }
    });

});
router.post("/test", function (req, res) {
    console.log(req.body.post);
});
//=======middleware

function schoolLoggedIn(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "school" && req.user.code != "") {
        return next();
    }
    res.redirect("/login");
};
//=============================================//////////////////////////==============================//
module.exports = router;
