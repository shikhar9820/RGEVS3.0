
var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var regSchema =new mongoose.Schema({
   
    username:String,
    password:String,
    code    :String,
    role    :String,
    pollId  :[String],

   

});

regSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("register",regSchema);
