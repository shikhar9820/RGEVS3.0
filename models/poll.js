//**************************************poll-database*********************************************************
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var pollSchema = new mongoose.Schema({
    authorId: String,
    code:     String,
    poll:     String,
    flag: { type: Boolean, default: false },
    post:    [String],
    house:   [String],
    voter:   [String],
    startDate: Date,
});

pollSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("poll", pollSchema);


