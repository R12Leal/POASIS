'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Medicamento Schema
 */
var MedicamentoSchema = new Schema({
	nombre_medicamento: {
		type: String,
		default: '',
		required: '¡Debe introducir el nombre del medicamento!',
		trim: true
	},
	nombre_laboratorio: {
		type: String,
		default: 'Sin Especificar',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Medicamento', MedicamentoSchema);