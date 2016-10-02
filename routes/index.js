var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


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

router.post('/createevent', function(req, res){
    // if(user.isAdmin){
        new Event({
            eventName : req.body.eventName,
            registrants : [],
            attendees : [],
            dates : [{startDate : req.body.startDate, endDate : req.body.endDate}],
            location : req.body.location,
            description : req.body.description,
            title : req.body.title,
            minLevel : req.body.minLevel,
            numAttendees : 0,
            training : req.body.training

        })
    // }

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
