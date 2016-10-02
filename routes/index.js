var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Event = require('../models/events');
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
<<<<<<< HEAD

    })
}

function getRegisteredUsers(event, xcall){
    Account.findOne({_id: eventId}, function(err, event, xcall) {

        xcall(event.registrants);
    })
}
=======
>>>>>>> 755b1b9263433e529035112af585177634244b91

    })
}

function getRegisteredUsers(event, xcall){
    Account.findOne({_id: eventId}, function(err, event, xcall) {

        xcall(event.registrants);
    })
}


router.get('/', function(req, res) {
    res.render('index', {
        user: req.user
    });
});

router.post('/register', function(req, res) {
    Account.register(
        new Account({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.email,
            zipcode: req.body.zipcode,
            dateOfBirth: req.body.dateOfBirth
        }), req.body.password,
        function(err, account) {
            if (err) {
                return res.render('index', {
                    error: err
                });
            }

            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        });
});

router.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/createevent', function(req, res){
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

    


router.get('/ping', function(req, res) {
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
        console.log(events[0].eventName);
        res.render('event', {event : events[0], user: req.user});
    });
});

router.get('/user/:userID', function(req, res) {
    res.render('user', {user: req.user})
    Event.find({
        _id: req.params.id
    }, function(err, eventID) {
        res.render('event', {
            event: eventID
        });
    });
});

router.get('/user/:id', function(req, res) {
    Account.findOne({
        _id: req.params.id
    }, function(err, user) {
        res.render('user', { account: user });
    });
});


module.exports = router;
