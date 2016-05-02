var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

//router.get('/question', quizController.question);
//router.get('/check', quizController.check);

router.get('/quizzes', 				quizController.index);
router.get('/quizzes/:quizId(\\d+)',		quizController.show);
router.get('/quizzes/:quizId(\\d+)/check',	quizController.check);

/* GET author. */
router.get('/author', function(req, res, next) {
  res.render('author', { title: 'author' });
});

module.exports = router;
