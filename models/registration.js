
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var regSchema = new mongoose.Schema({

    username: String,//Username: {        //type: String
      //, required: true
      //, validate: [validators.notEmpty, 'Name is empty']
      //}//name of user
    password: String,//hashed password 
    code    : String,//first four digit of poll code
    role    : String,//voter or school
    pollId  : [String],//Incase of school ,array of pollID organized by the school 



});

regSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("register", regSchema);
