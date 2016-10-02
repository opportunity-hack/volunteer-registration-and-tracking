var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Event = new Schema({
    eventName: String,
    eventDate: Date,
    location: String,
    description: String,
    minLevel: Number,
    training: Boolean,
    users: {type: Schema.Types.Mixed, default: null}
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Event', Event);
