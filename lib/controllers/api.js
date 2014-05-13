'use strict';

var project, task, user;

user 	= require('./api/user.js');
project = require('./api/project.js');
task 	= require('./api/task.js');

exports.index = function *() {
	this.body = {};
}

exports.user 	= user;
exports.project = project;
exports.task	= task;