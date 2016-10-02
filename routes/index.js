var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

function getTotalHours(userID, xcall){
    Account.findOne({
        _id: userID
    }, function(err, user, xcall) {
        var hours = 0;
        for (var event in user.events){
            var obj = user.events[event];
            hours += obj["timeOutActual"] - obj["timeInActual"];
        }
        xcall(hours);
    });
};

function getAttendedEvents(userId, xcall){
    Account.findOne({_id: userId}, function(err, user, xcall) {
        xcall(user.events);
    })

}

function getAttendedUsers(eventId, xcall){
    Account.findOne({_id: eventId}, function(err, event, xcall) {

        xcall(event.attendees);

    })
}

function getRegisteredUsers(event, xcall){
    Account.findOne({_id: eventId}, function(err, event, xcall) {

        xcall(event.registrants);
    })
}

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.post('/register', function(req, res) {
    Account.register(
        new Account({ firstName : req.body.firstName, lastName : req.body.lastName, username : req.body.email, zipcode : req.body.zipcode, dateOfBirth : req.body.dateOfBirth }), req.body.password, function(err, account) {
        if (err) {
            return res.render('index', {error:err});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

router.get('/event/:eventID', function(req, res) {
    res.render('event', { event : Event.find( { _id: req.params }) });
});

router.get('/user/:userID', function(req, res) {
    res.render('user', { user : Account.find( { _id: req.params }) })
})
module.exports = router;
