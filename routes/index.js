var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
        res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(
        new Account({ firstName : req.body.firstName, lastName : req.body.lastName, username : req.body.email, zipcode : req.body.zipcode, dateOfBirth : req.body.dateOfBirth }), req.body.password, function(err, account) {
        if (err) {
            return res.redirect('/');
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

module.exports = router;
