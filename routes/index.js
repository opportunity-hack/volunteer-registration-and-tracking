var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express',
      text:{
          item1:'Hello! (item1)',
          item2:'Goodbye! (item2)'
      },
      array:[
      'arrayitem1',
      'arrayitem2',
      'arrayitem3'
      ]
  });
});
router.get('/', function(req, res, next) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;
