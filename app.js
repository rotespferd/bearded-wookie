(function() {
  var app, koa, router, serve, render, path;

  koa     = require('koa');
  router  = require('koa-router');
  serve   = require('koa-static');
  render  = require('koa-ejs');
  path    = require('path');

  app = koa();

  //template locals
  var locals = {
    version: '0.0.1',
    now: function () {
      return new Date();
    }
  };

  //template filters
  var filters = {
    format: function (time) {
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
  };

  render(app, {
    root: path.join(__dirname, 'template'),
    layout: 'root',
    viewExt: 'html',
    cache: false,
    debug: true,
    locals: locals,
    filters: filters
  });

  app.use(router(app));

  /* Routing */

  //constollers
  var indexController = require('./lib/controllers/index.js');
  //static files
  app.use(serve(__dirname + '/static'));
  app.get('/', indexController.index);
  app.get('/partials/*', indexController.partials);

  app.listen(3000);

}).call(this);
