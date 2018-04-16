var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
// var session = require('express-session')
//
// var config = require('./database/config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var qiniu = require('./routes/qiniu');
// var news = require('./routes/news/news');
// var users = require('./routes/users/users');
// var login = require('./routes/login');
// var loginout = require('./routes/loginout');
// var changePwd = require('./routes/changePwd');

var app = express();
app.use(
    cors({
        origin: "http://192.168.1.125:8080",
        credentials: true
    })
);
// app.use(
//     session({
//         secret: "yao",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {maxAge: 3600 * 1000 * 24 * 30}
//     })
// );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api", require("./controller/index"));
// app.use('/api', qiniu);
// app.use('/api/news', news);
// app.use('/api/users', users);
// app.use('/api', login);
// app.use('/api', loginout);
// app.use('/api', changePwd);

// function checklogin(req, res, next){
//     if (!req.session.user) {
//         res.json({
//             data: "用户未登录",
//             code: 401,
//             msg: "你还没有登录，去登陆不吧，亲！",
//             ret: false
//         });
//         return;
//     }
//     next();
// };


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
