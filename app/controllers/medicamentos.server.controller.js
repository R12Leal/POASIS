'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Medicamento = mongoose.model('Medicamento'),
	_ = require('lodash');

/**
 * Create a Medicamento
 */
exports.create = function(req, res) {
	var medicamento = new Medicamento(req.body);
	medicamento.user = req.user;

	medicamento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicamento);
		}
	});
};

/**
 * Show the current Medicamento
 */
exports.read = function(req, res) {
	res.jsonp(req.medicamento);
};

/**
 * Update a Medicamento
 */
exports.update = function(req, res) {
	var medicamento = req.medicamento ;

	medicamento = _.extend(medicamento , req.body);

	medicamento.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicamento);
		}
	});
};

/**
 * Delete an Medicamento
 */
exports.delete = function(req, res) {
	var medicamento = req.medicamento ;

	medicamento.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(medicamento);
		}
	});
};

/**
 * List of Medicamentos
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Medicamento
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, medicamentos){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(medicamentos);
			}
		});

};

/**
 * Medicamento middleware
 */
exports.medicamentoByID = function(req, res, next, id) {
	Medicamento.findById(id).populate('user', 'displayName').exec(function(err, medicamento) {
		if (err) return next(err);
		if (! medicamento) return next(new Error('Failed to load Medicamento ' + id));
		req.medicamento = medicamento ;
		next();
	});
};

/**
 * Medicamento authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.medicamento.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
