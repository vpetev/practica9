var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

/* GET author. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'author' });
});

module.exports = router;
