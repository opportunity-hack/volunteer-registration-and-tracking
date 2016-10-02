ar mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var event = new Schema({
    eventName: String,
    volunteers: Array,
    eventDate: Date,
    location: String,
    description: String,
    title: String,
    minLevel: Number,
    numAttendees: Number,
    training: Boolean
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Event', Event);


};
