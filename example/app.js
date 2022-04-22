'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ecstatic = require('ecstatic');
const nunjucks = require('nunjucks');

const config = require('./combo.config');

const app = global.app = express();
app.locals.pretty = false;

app.set('env', config.env);
app.disable('x-powered-by');

app.use(require('express-combojs')({
  split: config.comboSplit,
  comboUrlRule: config.comboUrlRule
}))

// routes
require('./routers')(app);

// 模版引擎配置必须放在路由之后
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// pipeline
app.use(ecstatic({ root: config.path, showDir: true, autoIndex: false, cache: 'no-cache' }))
//cookie
.use(cookieParser())
.use(bodyParser.urlencoded({
  extended: false
}))
.use(function(err, req, res, next) {
  res.json(err);
  console.error('[%s][%s] Express handle exception: [%s]', new Date(), process.pid, err);
  console.error(err)
});


app.listen(config.port, function() {
  console.log(`[${new Date()}] app start : ${config.port}`);
});

process.on('uncaughtException', function(err) {
  console.log('[%s][%s] Caught exception: [%s]', new Date(), process.pid, err);
  console.error(err)
});

module.exports = app;
