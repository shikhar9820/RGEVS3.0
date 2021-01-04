
var mongoose = require("mongoose");//Getting the mongoose dependency
var passportLocalMongoose = require("passport-local-mongoose");

var candidateSchema = new mongoose.Schema({
    id   : String,//Id of the poll
    house: String,//House of the Candidate standing for an Election
    post : String,//Post of the Candidate contesting election
    name : String,//Name of the candidate contesting election
    votes: Number,//Total no of votes gained in the election
    image: String //Image name of the candidate

});

candidateSchema.plugin(passportLocalMongoose);//plugging in mongoose to candidateSchema

module.exports = mongoose.model("candidate", candidateSchema);
