(function() {
  var app, koa, router, serve, render, path;

  koa     = require('koa');
  router  = require('koa-router');
  serve   = require('koa-static');
  render  = require('koa-ejs');
  path    = require('path');


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

  app = koa();
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
  //static files
  app.use(serve(__dirname + '/static'));

  app.listen(3000);

  app.get('/', function *(next){
    yield this.render('index', {});
  })
  

}).call(this);
