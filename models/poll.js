//**************************************poll-database*********************************************************
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var pollSchema = new mongoose.Schema({
    authorId: String,//Id of the creator i.e School
    code:     String,//Code of the poll
    poll:     String,//Name of the poll
    flag:     {type: Boolean, default: false },//Activation Flag for poll to start
    post:     [String],//No of posts associated with the poll
    house:    [String],//Houses associated with the poll
    voter:    [String],//Voter List Corresponding to poll //hashMap could be a good solution as well
    startDate: Date,//StartDate of the poll
});

pollSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("poll", pollSchema);


