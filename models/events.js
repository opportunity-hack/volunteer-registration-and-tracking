ar mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var event = new Schema({
    eventName: String,
    volunteers: int,
    eventDate: Date,
    location: String,
    description: String,
    title: String,
    minLevel: int,
    numAttendees: int,
    training: bool

});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Event', Event);


};
