var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Event = new Schema({
    eventName: String,
    registrants: Schema.Types.Mixed, //array of objects containing userID startDate and endDate
    attendees: Schema.Types.Mixed, //array of objects containing userID startDate and endDate
    dates: Schema.Types.Mixed, //array of objects containing startDate and endDate
    location: String,
    description: String,
    minLevel: Number,
    numAttendees: Number,
    training: Boolean
});

Event.plugin(passportLocalMongoose);

module.exports = mongoose.model('Event', Event);
