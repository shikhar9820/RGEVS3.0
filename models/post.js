//**************************************post-database*********************************************************
var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var postSchema =new mongoose.Schema({
    id:String,
    house:String,
    post:String
});

postSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("post",postSchema);


