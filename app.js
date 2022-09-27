var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

var compression = require('compression');
var helmet = require('helmet');

var app = express();


// Set up mongoose connection
// var mongoose = require('mongoose');
// const { Console } = require('console');
// var dev_db_url = 'mongodb://localhost:27017/mongo_test';
// var mongoDB = dev_db_url;
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => { console.log("db연결")});
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const mysql = require('mysql');
const myConnection = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : '1q2w3e4r!',
  database  : 'node_test'
});

myConnection.connect();

myConnection.query('SELECT * FROM user', (error, rows, fields) => {
  if (error) console.log(error);
  console.log('User info is : ', rows); 

  for(val in rows){
    let name = rows[val].name;
    let age = rows[val].age;
    console.log("이름 : " + rows[val].name + ",나이 : " + rows[val].age);
    console.log("이름 : ${name},나이 : ${age}");
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.
console.log('연결이...');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console('연결은 됐으나');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('연결이...?');
module.exports = app;
