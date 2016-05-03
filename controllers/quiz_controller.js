var models = require('../models');

//Autoload el quiz asociado a :quizId
exports.load = function(req, res, next, quizId) {
 models.Quiz.findById(quizId)
  .then(function(quiz) {
   if (quiz) {
    req.quiz = quiz;
    next();
   } else {
    next(new Error('No existe quizId= ' + quizId));
   }
  }).catch(function(error) { next(error); });
};

//GET /quizzes
exports.index = function(req, res, next) {
 if (req.query.search){
  var busca = req.query.search.split(' ');
  busca = '%' + busca.join('%') + '%';
  models
  .Quiz
  .findAll({where: [ 'question like ?' , busca]})
  .then(function(quizzes){
   res.render('quizzes/index.ejs', { quizzes: quizzes});
  })
  .catch(function(error) {next(error);});
 } else {
 models
 .Quiz
 .findAll()
 .then(function(quizzes) {
  res.render('quizzes/index.ejs', { quizzes: quizzes});
 })
 .catch(function(error) { next(error); });
 }
};

//GET /quizzes/:id
exports.show = function(req, res, next) {
 models
 .Quiz
 .findById(req.params.quizId) //Busca primera pregunta
 .then(function(quiz){
  if(quiz){
   var answer = req.query.answer || '';
   res.render('quizzes/show', {quiz: req.quiz, answer: answer});
  } else {
   throw new Error('No hay preguntas en la BBDD');
  }
 }).catch(function(error) {next(error); });
};

//GET /quizzes/:id/check
exports.check = function(req, res) {
 models
 .Quiz
 .findById(req.params.quizId) //Busca primera pregunta
 .then(function(quiz){
  if(quiz){
   var answer = req.query.answer || '';
   var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
   res.render('quizzes/result', {quiz: req.quiz, result: result, answer: answer});
  } else {
   throw new Error('No hay preguntas en la BBDD');
  }
 }).catch(function(error) {next(error); });
};


//GET /quizes?search=texto_a_buscar
//exports.check = function(req, res) {
// models
// .Quiz
// .findById(req.params.quizId) 
// .then(function(quiz){
//  if(quiz){
//   var buscar = 
//   res.render('quizzes/busquedas', {quiz: req.quiz});
//  } else {
//   throw new Error('No hay ninguna pregunta que contega esos caracteres');
//  }
// }).catch(function(error) {next(error); });
//};

//GET /author
//exports.credits = function(req, res, next) {
//res.render('quizzes/author');
//};
