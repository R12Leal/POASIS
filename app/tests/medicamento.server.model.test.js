'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Medicamento = mongoose.model('Medicamento');

/**
 * Globals
 */
var user, medicamento;

/**
 * Unit tests
 */
describe('Medicamento Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			medicamento = new Medicamento({
				name: 'Medicamento Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return medicamento.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			medicamento.name = '';

			return medicamento.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Medicamento.remove().exec(function(){
			User.remove().exec(function(){
				done();	
			});
		});
	});
});
