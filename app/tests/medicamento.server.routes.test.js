'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Medicamento = mongoose.model('Medicamento'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, medicamento;

/**
 * Medicamento routes tests
 */
describe('Medicamento CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Medicamento
		user.save(function() {
			medicamento = {
				name: 'Medicamento Name'
			};

			done();
		});
	});

	it('should be able to save Medicamento instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medicamento
				agent.post('/medicamentos')
					.send(medicamento)
					.expect(200)
					.end(function(medicamentoSaveErr, medicamentoSaveRes) {
						// Handle Medicamento save error
						if (medicamentoSaveErr) done(medicamentoSaveErr);

						// Get a list of Medicamentos
						agent.get('/medicamentos')
							.end(function(medicamentosGetErr, medicamentosGetRes) {
								// Handle Medicamento save error
								if (medicamentosGetErr) done(medicamentosGetErr);

								// Get Medicamentos list
								var medicamentos = medicamentosGetRes.body;

								// Set assertions
								(medicamentos[0].user._id).should.equal(userId);
								(medicamentos[0].name).should.match('Medicamento Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Medicamento instance if not logged in', function(done) {
		agent.post('/medicamentos')
			.send(medicamento)
			.expect(401)
			.end(function(medicamentoSaveErr, medicamentoSaveRes) {
				// Call the assertion callback
				done(medicamentoSaveErr);
			});
	});

	it('should not be able to save Medicamento instance if no name is provided', function(done) {
		// Invalidate name field
		medicamento.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medicamento
				agent.post('/medicamentos')
					.send(medicamento)
					.expect(400)
					.end(function(medicamentoSaveErr, medicamentoSaveRes) {
						// Set message assertion
						(medicamentoSaveRes.body.message).should.match('Please fill Medicamento name');
						
						// Handle Medicamento save error
						done(medicamentoSaveErr);
					});
			});
	});

	it('should be able to update Medicamento instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medicamento
				agent.post('/medicamentos')
					.send(medicamento)
					.expect(200)
					.end(function(medicamentoSaveErr, medicamentoSaveRes) {
						// Handle Medicamento save error
						if (medicamentoSaveErr) done(medicamentoSaveErr);

						// Update Medicamento name
						medicamento.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Medicamento
						agent.put('/medicamentos/' + medicamentoSaveRes.body._id)
							.send(medicamento)
							.expect(200)
							.end(function(medicamentoUpdateErr, medicamentoUpdateRes) {
								// Handle Medicamento update error
								if (medicamentoUpdateErr) done(medicamentoUpdateErr);

								// Set assertions
								(medicamentoUpdateRes.body._id).should.equal(medicamentoSaveRes.body._id);
								(medicamentoUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Medicamentos if not signed in', function(done) {
		// Create new Medicamento model instance
		var medicamentoObj = new Medicamento(medicamento);

		// Save the Medicamento
		medicamentoObj.save(function() {
			// Request Medicamentos
			request(app).get('/medicamentos')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Medicamento if not signed in', function(done) {
		// Create new Medicamento model instance
		var medicamentoObj = new Medicamento(medicamento);

		// Save the Medicamento
		medicamentoObj.save(function() {
			request(app).get('/medicamentos/' + medicamentoObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', medicamento.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Medicamento instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Medicamento
				agent.post('/medicamentos')
					.send(medicamento)
					.expect(200)
					.end(function(medicamentoSaveErr, medicamentoSaveRes) {
						// Handle Medicamento save error
						if (medicamentoSaveErr) done(medicamentoSaveErr);

						// Delete existing Medicamento
						agent.delete('/medicamentos/' + medicamentoSaveRes.body._id)
							.send(medicamento)
							.expect(200)
							.end(function(medicamentoDeleteErr, medicamentoDeleteRes) {
								// Handle Medicamento error error
								if (medicamentoDeleteErr) done(medicamentoDeleteErr);

								// Set assertions
								(medicamentoDeleteRes.body._id).should.equal(medicamentoSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Medicamento instance if not signed in', function(done) {
		// Set Medicamento user 
		medicamento.user = user;

		// Create new Medicamento model instance
		var medicamentoObj = new Medicamento(medicamento);

		// Save the Medicamento
		medicamentoObj.save(function() {
			// Try deleting Medicamento
			request(app).delete('/medicamentos/' + medicamentoObj._id)
			.expect(401)
			.end(function(medicamentoDeleteErr, medicamentoDeleteRes) {
				// Set message assertion
				(medicamentoDeleteRes.body.message).should.match('User is not logged in');

				// Handle Medicamento error error
				done(medicamentoDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Medicamento.remove().exec(function(){
				done();
			});	
		});
	});
});
