(function() {
  var app, koa, router, serve, render, path, json;

  koa     = require('koa');
  router  = require('koa-router');
  serve   = require('koa-static');
  render  = require('koa-ejs');
  path    = require('path');
  json    = require('koa-json')

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
  app.use(json());

  /* Routing */

  //constollers
  var indexController = require('./lib/controllers/index.js');
  var apiController = require('./lib/controllers/api.js');

  //static files
  app.use(serve(__dirname + '/static'));
  app.get('/', indexController.index);
  app.get('/partials/*', indexController.partials);
  
  //api
  /* project */
  app.get('/api', apiController.index);
  app.get('/api/projects', apiController.project.list);
  app.post('api/projects', apiController.project.create);
  app.get('api/projects/:id', apiController.project.show);
  app.delete('api/projects/:id', apiController.project.remove);
  app.put('api/projects/:id', apiController.project.update);

  /* task */
  app.get('/api/projects/:projectId/tasks', apiController.task.list);
  app.post('api/projects/:projectId/tasks', apiController.task.create);
  app.get('api/projects/:projectId/tasks/:id', apiController.task.show);
  app.delete('api/projects/:projectId/tasks/:id', apiController.task.remove);
  app.put('api/projects/:projectId/tasks/:id', apiController.task.update);

  /* user */
  app.get('/api/users', apiController.user.list);
  app.get('api/users/:id', apiController.user.show);
  app.put('api/users/:id', apiController.user.update);


  app.listen(3000);

}).call(this);
