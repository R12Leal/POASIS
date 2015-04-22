'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var residentes = require('../../app/controllers/residentes.server.controller');

	// Residentes Routes
	app.route('/residentes')
		.get(residentes.list)
		.post(users.requiresLogin, residentes.create);

	app.route('/residentes/:residenteId')
		.get(residentes.read)
		.put(users.requiresLogin, residentes.hasAuthorization, residentes.update)
		.delete(users.requiresLogin, residentes.hasAuthorization, residentes.delete);

	// Finish by binding the Residente middleware
	app.param('residenteId', residentes.residenteByID);
};
