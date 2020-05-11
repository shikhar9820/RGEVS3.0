var express = require("express");
var router = express.Router();
var passport = require("passport");
var posts = require("../models/post");
var candidate = require("../models/candidate");
var request = require('ajax-request');
var polls = require("../models/poll");
var multer = require("multer");
var count = -1;
//var user      =require("./models/registration");

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
 // console.log(req.user.code);
  polls.find({}, function (err, poll) {
    if (err) {
      console.log("ERROR");
    } else {
      //console.log(poll);
      res.render("voter/polls", { poll: poll });
    }
  });
});



//=============================================//
//=============Election List===========================//
//===========================================//


router.get("/hello/:id", voterLoggedIn, function (req, res) {
  count = count + 1;
  //console.log("hello");
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR123");
    } else {
      polling.voter.forEach(function (voterId) {
        if (voterId == req.user.username) {
          //Link is selected item from sub heading list
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
  count = count + 1;
 // console.log("hello");
 // console.log(req.params);
  console.log(req.query);
  console.log(req.query.post);
  //var n = req.query;

  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR123");
    } else {
      polling.voter.forEach(function (voterId) {
        if (voterId == req.user.username) {
          //Link is selected item from sub heading list
          candidate.find({ $and: [ { id: req.params.id}, { post: req.query.post  } ] }, function (err, candidates) {
            console.log(candidates);
            if (err) {
              console.log("ERROR566");
            }
            else{
              res.send({house:polling.house,candy:candidates,id:req.params.id});
            }
          });
        }

      });
    }

  });
});

router.put("/matdan/:id", voterLoggedIn, function (req, res) {
 /* console.log("matdan");
  console.log(req);
  console.log(req.body);
  console.log(req.params.id);
  console.log(req.data);
  console.log(req.params);
  console.log("common")*/
  polls.findById(req.params.id, function (err, polling) {
    if (err) {
      console.log("ERROR");
    } else {
      polling.house.forEach(function (housing) {
        //console.log(housing);
        //console.log(req.body.Green);
        console.log("parameter is " + housing + " and value is " + req.body[housing]);
        //var checkb
        //console.log(checkbox.length);
        //for(var i=0;i<checkbox.length;i++){
        //if(checkbox[i].checked)  
        /*{*/
         var id1=req.body[housing];
         console.log(id1);
          candidate.findByIdAndUpdate({_id:id1},{$inc: {votes: 1}},function(err,candidate){
            if(err){
                console.log("ERROR");
            } 
            else{
              console.log("lo");
            }
            });

        //}
        //}

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

/*

<!-- AJAX Script code-->
<script type ="text/javascript">
    // UPDATE/PUT
    $('form').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/matdan/:' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
</script>
*/
//new comment

/* <script type="text/javascript">

      $(document).ready(function() {
        $("input").click(function() {
            $(this).fadeOut();
            console.log("hi");
          });
          });
          </script> */

/*
  $(function() {
// GET/READ
$('#get-button').on('click', function() {
$.ajax({
  url: '/show/:+',
  contentType: 'application/json',
  success: function(response) {
      var tbodyEl = $('tbody');

      tbodyEl.html('');

      response.products.forEach(function(product) {
          tbodyEl.append('\
              <tr>\
                  <td class="id">' + product.id + '</td>\
                  <td><input type="text" class="name" value="' + product.name + '"></td>\
                  <td>\
                      <button class="update-button">UPDATE/PUT</button>\
                      <button class="delete-button">DELETE</button>\
                  </td>\
              </tr>\
          ');
      });
  }
});
});
*/



/*
//========Result=============
router.put("/matdan/:id",voterLoggedIn,function(req,res){
  
  polls.findById(req.params.id,function(err,polling){
      if(err){
          console.log("ERROR");
      } else {
          polling.house.forEach(function(housing){
              console.log(housing);
              var house=housing;
              
              candidate.findOneAndUpdate({id:req.body.house},{$inc: {votes: 1}},function(err,candidate){
                  if(err){
                      console.log("ERROR");
                  } 
              });
          });
        }
      });        
});*/

/*router.get("/show/:id",voterLoggedIn,function(req,res){
  polls.findById(req.params.id,function(err,polling){
      if(err){
          console.log("ERROR");
      } else {
        polling.voter.forEach(function(voterId){
              if(voterId==req.user.username)
              {
               res.render("voter/option",{posts:polling.post,id:req.params.id});
              } 
      });
    } 
  });         
});
*/

