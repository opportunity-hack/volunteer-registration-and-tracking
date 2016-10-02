var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', {
      title: 'Express',
      text:{
          item1:'Hello! (item1)',
          item2:'Goodbye! (item2)'
      },
=======
  res.render('index', { 
      title: 'Express', 
      text:{
          item1:'Hello! (item1)',
          item2:'Goodbye! (item2)'
      }, 
>>>>>>> master
      array:[
      'arrayitem1',
      'arrayitem2',
      'arrayitem3'
      ]
  });
});

module.exports = router;
