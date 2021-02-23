var express   = require("express");
var router    = express.Router();
var candidate = require("../models/candidate");
var voter     = require("../models/voters");
var polls     = require("../models/poll");
var multer    = require("multer");
//Multer Config= Multer stores the file uploaded by the user in the form of document and image files..
var storage   = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload    = multer({ storage: storage });

//VOTER LANDING== This route will display the elections associated with each voter 
router.get("/elect", voterLoggedIn, function (req, res) {
  polls.find({}, function (err, poll) {
    if (err) {
      console.log("ERROR");
    } else {
      res.render("voter/polls", { poll: poll ,voterId:req.query.voterId});
    }
  });
});

//Election List== This will display the list of candidates standing in that election w.r.t posts
router.get("/hello/:id", voterLoggedIn, function (req, res) {
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR123");
    } else {
      var count = JSON.stringify(polling.post).length - (2 * polling.post.length) - 2 + 1;
      polling.voter.forEach(function (voterId) {
        if (voterId == req.user.username) {
          //Link is selected item from sub heading list
          candidate.find({ id: req.params.id }, function (err, candidate) {
            if (err) {
              console.log("ERROR");
            } else {
              res.render("voter/demo", { username: voterId, house: polling.house, posts: polling.post, candidates: candidate, id: req.params.id, len: count, poses: JSON.stringify(polling.post) });
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
              res.send({ house: polling.house, candy: candidates, id: req.params.id, post: req.query.post });
            }
          });
        }

      });
    }

  });
});

router.put("/matdan/:id", voterLoggedIn, function (req, res) {
  var x = " ";
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR");
    } else {
      polling.house.forEach(function (housing) {

        console.log("parameter is " + housing + " and value is " + req.body[housing]);

        var id1 = req.body[housing];
        console.log(id1);
        candidate.findOneAndUpdate({ _id: id1 }, { $inc: { votes: 1 } }, function (err, candidature) {
          if (err) {
            console.log("ERROR");
          }
          else {
            console.log(candidature);
          }
        });
        console.log(x);
        //res.redirect("/hello/"+req.params.id);

      });
      res.send({ redirectTo: '/hello/' + req.params.id, redirectToo: '/elect' });
    }

  });

});

//==middleware==//

function voterLoggedIn(req, res, next) {
  var voter = req.query.voterId;
  var voterCode = voter.slice(0, 7);
  votersList.find({ code: voterCode }, function (err, cb) {
    if (err) {
      console.log(err);
    }
    else {
      if (cb.voterList.includes(voter)) {
        return next();
      }
      else {
        //create another page for not authVoter
        res.redirect("/voterSignUp");
      }
    }

  });


};

//================================================================================================//
module.exports = router;
/*
success: function(result, status, xhr) {
  console.log('success')
  window.location.href = result.redirectTo
},
error  : function(xhr, status, error) {
  console.log('error')
}*/