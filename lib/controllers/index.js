'use strict';

var path = require('path');

exports.index = function *(next){
    yield this.render('index', {});
};

exports.partials = function *(next) {
	var stripped = this.req.url.split('.')[0];
	var requestedView = path.join('./', stripped);
	try {
		yield this.render(requestedView, {layout: "partials/root"});
	}catch(e) {
		this.status = 404;
		this.body = 404; 
	}
};