var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./config/passport.conf');
var usersRouter = require('./routes/service.route');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, './front')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, noauth, Accept");
    next();
  });

// app.get('/', (req, res)=>{
//     let api = new ApiStore();
//     console.log(api.generateusers());
//     res.json({msg:'Hey!'})
// });
app.use('/api', usersRouter);

app.get('**', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


module.exports = app;
