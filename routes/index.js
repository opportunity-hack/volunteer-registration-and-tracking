var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Event = require('../models/events');
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
    console.log("foo");
    console.dir(req.body);
        var evt = new Event({
            eventName : req.body.eventName,
            registrants : [],
            attendees : [],
            dates : [{startDate : req.body.startDate, endDate : req.body.endDate}],
            location : req.body.location,
            description : req.body.description,
            minLevel : req.body.minLevel,
            numAttendees : 0,
            training : req.body.training

        });
        console.log(evt);
        evt.save(function(err, evt) {
            if (err) return console.error(err);
            console.dir(evt);
            res.render('index',{error:"event created!"});
        });

});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});
router.get('/event/new', function(req, res) {
    res.render('event', {test:"hello", user : req.user});
});
router.get('/event', function(req, res) {
    console.log("boo");
    Event.find(function(err, events){
        if(err){console.dir(err);}
        console.dir(events);
        res.status(200).send(events);
    });
});
router.get('/makechuckadmin', function(req, res){
    Account.findOne({username:"chuck@chuckdries.com"}, function(error, chuck){
        chuck.isAdmin = true;
        chuck.save(function(err){
            if(err){
                console.log(err);
            } else {
                res.status(200).send("success!");
            }
        })
    })
});
router.get('/event/:eventID/modify', function(req, res) {
    res.render('event', {user: req.user});
});
router.get('/event/:eventID', function(req, res) {
    Event.find({ id_: req.params.id }, function(err, events){
        if(err){console.dir(err);}
        console.log(events);
        res.render('event', {event : events, user: req.user});
    });
});

router.get('/user/:userID', function(req, res) {
    res.render('user', {user: req.user})
})
module.exports = router;
