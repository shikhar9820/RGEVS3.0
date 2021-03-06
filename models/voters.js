//**************************************poll-database*********************************************************
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var voterSchema = new mongoose.Schema({
    id: String,
    code: String,
    voterList: [String]//voterList
});

voterSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("voter", voterSchema);


