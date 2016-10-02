var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    zipcode: Number,
    dateOfBirth: Date,
    events: Schema.Types.Mixed,
    hours: {type: Number, default: 0},
    trainingLevel: {type: Number, default: 0},
    checkedIn: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    password: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);