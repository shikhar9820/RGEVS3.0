//**************************************post-database*********************************************************
var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var voterSchema =new mongoose.Schema({
    code:String,
    username:String,
    password:String,
});

voterSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("voter",voterSchema);


