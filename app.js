var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs')

//引入session模块
let session = require('express-session')

//引入前端模块
var adminRouter1 = require('./routes/admin/adminRouter1')
//引入前端注册登录模块
var loginRouter1 = require('./routes/login/loginRouter1')
var registerRouter1 = require('./routes/login/registerRouter1')



//引入后台模块
var adminRouter = require('./routes/admin/adminRouter')
var manage = require("./routes/admin/manage")
//引入注册登录模块
var loginRouter = require('./routes/login/loginRouter')
var registerRouter = require('./routes/login/registerRouter')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.engine('ejs', ejs.__express);
app.engine(".html", ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置session
app.use(session({
  secret: "xzsagjasojaso",
  resave: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 1000
  },
  saveUninitialized: true
}))

//前台路由

app.use('/admin1', adminRouter1);

//后台路由
app.use('/admin', adminRouter);
app.use('/admin', manage);

//前端登录注册路由
app.use('/r', loginRouter1)
app.use('/r', registerRouter1)

//后端登录注册路由
app.use('/rl', loginRouter)
app.use('/rl', registerRouter)



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
  console.log("err" + err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
