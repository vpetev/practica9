var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
//	DATABASE_URL = sqlite:///
//	DATABAS_STORAGE = quiz.sqlite
// USAR BBDD Postgres:
//	DATABASE URL = postgres://user:passw@hst:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
 url = "sqlite:///";
 storage = "quiz.sqlite";
} else {
 url = process.env.DATABASE_URL;
 storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, 
				   { storage: storage,
				     omitNull: true
				   });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// sequelize.sync() crea e inicializa tabla de preguntas en DB
//sequelize
//.sync()
//.then(function(){ // sync() crea la tabla quiz
// return Quiz
//   .count()
//   .then(function(c){
//    if(c === 0){ // la tabala se iniciliza si esta vacia
//    return Quiz
//       //.create({question: 'Capital de Italia',   answer: 'Roma'})
//	.bulkCreate([ {	question: 'Capital de Italia', answer: 'Roma'},
//		      { question: 'Capital de Portugal', answer: 'Lisboa'}
//		   ])
//       .then(function(){
//        console.log('Base de datos inicializada con datos');
//       });
//    }
//   })
//}).catch(function(error){
// console.log('Error sincronizando la base de datos:', error);
// process.exit(1);
//});

exports.Quiz = Quiz; // exportar definicion de tabla Quiz
