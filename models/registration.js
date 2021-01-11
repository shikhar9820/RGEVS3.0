
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var regSchema = new mongoose.Schema({

    username: String,//Username: {//type: String
      //, required: true
      //, validate: [validators.notEmpty, 'Name is empty']
      //}//name of user
    password: String,//hashed password 
    code    : String,//SchoolCode 
    role    : String,//User or Admin
    pollId  : [String],//Incase of school ,array of pollID organized by the school 



});

regSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("register", regSchema);
