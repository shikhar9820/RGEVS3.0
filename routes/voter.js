var express = require("express");
var router = express.Router();
var candidate = require("../models/candidate");
var polls = require("../models/poll");
var multer = require("multer");

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

//=================//
//VOTER LANDING//
//=============//

router.get("/elect", voterLoggedIn, function (req, res) {
  polls.find({}, function (err, poll) {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("voter/polls", { poll: poll });
    }
  });
});



//=============================================//
//=============Election List===========================//
//===========================================//


router.get("/hello/:id", voterLoggedIn, function (req, res) {
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR123");
    } else {
      polling.voter.forEach(function (voterId) {
        if (voterId == req.user.username) {
          candidate.find({ id: req.params.id, post: req.body.post }, function (err, candidate) {
            if (err) {
              console.log("ERROR");
            } else {
              res.render("voter/demo", { posts: polling.post, candidates: candidate, id: req.params.id });
            }
          });
        }

      });
    }

  });
});

router.get("/show/:id", voterLoggedIn, function (req, res) {
  console.log(req.query);
  console.log(req.query.post);
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR123");
    } else {
      polling.voter.forEach(function (voterId) {
        if (voterId == req.user.username) {
          candidate.find({ $and: [{ id: req.params.id }, { post: req.query.post }] }, function (err, candidates) {
            console.log(candidates);
            if (err) {
              console.log("ERROR566");
            }
            else {
              res.send({ house: polling.house, candy: candidates, id: req.params.id });
            }
          });
        }

      });
    }

  });
});

router.put("/matdan/:id", voterLoggedIn, function (req, res) {

  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR");
    } else {
      polling.house.forEach(function (housing) {

        console.log("parameter is " + housing + " and value is " + req.body[housing]);

        var id1 = req.body[housing];
        console.log(id1);
        candidate.findByIdAndUpdate({ _id: id1 }, { $inc: { votes: 1 } }, function (err, candidate) {
          if (err) {
            console.log("ERROR");
          }
          else {
            console.log("lo");
          }
        });

      });
    }

  });
  res.send('Succesfully updated product!');
});

//=======middleware

function voterLoggedIn(req, res, next) {
  if (req.isAuthenticated() && req.user.role == "voter") {
    return next();
  }
  res.redirect("/login");
};

//================================================================================================//
module.exports = router;

