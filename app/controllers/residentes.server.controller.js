'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Residente = mongoose.model('Residente'),
	_ = require('lodash');

/**
 * Create a Residente
 */
exports.create = function(req, res) {
	var residente = new Residente(req.body);
	residente.user = req.user;

	residente.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(residente);
		}
	});
};

/**
 * Show the current Residente
 */
exports.read = function(req, res) {
	res.jsonp(req.residente);
};

/**
 * Update a Residente
 */
exports.update = function(req, res) {
	var residente = req.residente ;

	residente = _.extend(residente , req.body);

	residente.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(residente);
		}
	});
};

/**
 * Delete an Residente
 */
exports.delete = function(req, res) {
	var residente = req.residente ;

	residente.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(residente);
		}
	});
};

/**
 * List of Residentes
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


	Residente
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, residentes){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(residentes);
			}
		});

};

/**
 * Residente middleware
 */
exports.residenteByID = function(req, res, next, id) {
	Residente.findById(id).populate('user', 'displayName').exec(function(err, residente) {
		if (err) return next(err);
		if (! residente) return next(new Error('Failed to load Residente ' + id));
		req.residente = residente ;
		next();
	});
};

/**
 * Residente authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.residente.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
