
var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var candidateSchema =new mongoose.Schema({
    id:String,
    house:String,
    post:String,
    name:String,
    votes:Number,
    image: String

});

candidateSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("candidate",candidateSchema);
