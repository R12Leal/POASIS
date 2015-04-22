'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var medicamentos = require('../../app/controllers/medicamentos.server.controller');

	// Medicamentos Routes
	app.route('/medicamentos')
		.get(medicamentos.list)
		.post(users.requiresLogin, medicamentos.create);

	app.route('/medicamentos/:medicamentoId')
		.get(medicamentos.read)
		.put(users.requiresLogin, medicamentos.hasAuthorization, medicamentos.update)
		.delete(users.requiresLogin, medicamentos.hasAuthorization, medicamentos.delete);

	// Finish by binding the Medicamento middleware
	app.param('medicamentoId', medicamentos.medicamentoByID);
};
