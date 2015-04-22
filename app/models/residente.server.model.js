'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Residente Schema
 */
var ResidenteSchema = new Schema({
	nombre_residente: {
		type: String,
		default: '',
		required: '¡Introduzca el nombre del residente!',
		trim: true
	},
	apellido1_residente: {
		type: String,
		required: '¡Introduzca el primer apellido del residente!',
		trim: true
	},
	apellido2_residente: {
		type: String,
		required: '¡Introduzca el segundo apellido del residente!',
		trim: true
	},
	fecha_nacimiento: {
		type: String,
		required: 'Introduzca fecha de nacimiento del residente!',
		trim: true
	},
	fecha_ingreso: {
		type: String,
		required: '¡Introduzca la fecha de ingreso del residente!',
		trim: true
	},
	ss: {
		type: String,
		default: '00/00000000/00'
	},
	num_hab: {
		type: Number,
		default: 0
	},
	estado: {
		type: String,
		default: 'Activo',
		enum: ['Activo','Inactivo']
	},
	dieta: {
		type: String,
		default: 'Normal',
		enum: ['Normal','Turmix','Blanda','Triturada']
	},
	observaciones: {
		type: String,
		default: '¡Sin obervaciones!',
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

mongoose.model('Residente', ResidenteSchema);