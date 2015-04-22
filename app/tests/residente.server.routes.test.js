'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Residente = mongoose.model('Residente'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, residente;

/**
 * Residente routes tests
 */
describe('Residente CRUD tests', function() {
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

		// Save a user to the test db and create new Residente
		user.save(function() {
			residente = {
				name: 'Residente Name'
			};

			done();
		});
	});

	it('should be able to save Residente instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Residente
				agent.post('/residentes')
					.send(residente)
					.expect(200)
					.end(function(residenteSaveErr, residenteSaveRes) {
						// Handle Residente save error
						if (residenteSaveErr) done(residenteSaveErr);

						// Get a list of Residentes
						agent.get('/residentes')
							.end(function(residentesGetErr, residentesGetRes) {
								// Handle Residente save error
								if (residentesGetErr) done(residentesGetErr);

								// Get Residentes list
								var residentes = residentesGetRes.body;

								// Set assertions
								(residentes[0].user._id).should.equal(userId);
								(residentes[0].name).should.match('Residente Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Residente instance if not logged in', function(done) {
		agent.post('/residentes')
			.send(residente)
			.expect(401)
			.end(function(residenteSaveErr, residenteSaveRes) {
				// Call the assertion callback
				done(residenteSaveErr);
			});
	});

	it('should not be able to save Residente instance if no name is provided', function(done) {
		// Invalidate name field
		residente.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Residente
				agent.post('/residentes')
					.send(residente)
					.expect(400)
					.end(function(residenteSaveErr, residenteSaveRes) {
						// Set message assertion
						(residenteSaveRes.body.message).should.match('Please fill Residente name');
						
						// Handle Residente save error
						done(residenteSaveErr);
					});
			});
	});

	it('should be able to update Residente instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Residente
				agent.post('/residentes')
					.send(residente)
					.expect(200)
					.end(function(residenteSaveErr, residenteSaveRes) {
						// Handle Residente save error
						if (residenteSaveErr) done(residenteSaveErr);

						// Update Residente name
						residente.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Residente
						agent.put('/residentes/' + residenteSaveRes.body._id)
							.send(residente)
							.expect(200)
							.end(function(residenteUpdateErr, residenteUpdateRes) {
								// Handle Residente update error
								if (residenteUpdateErr) done(residenteUpdateErr);

								// Set assertions
								(residenteUpdateRes.body._id).should.equal(residenteSaveRes.body._id);
								(residenteUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Residentes if not signed in', function(done) {
		// Create new Residente model instance
		var residenteObj = new Residente(residente);

		// Save the Residente
		residenteObj.save(function() {
			// Request Residentes
			request(app).get('/residentes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Residente if not signed in', function(done) {
		// Create new Residente model instance
		var residenteObj = new Residente(residente);

		// Save the Residente
		residenteObj.save(function() {
			request(app).get('/residentes/' + residenteObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', residente.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Residente instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Residente
				agent.post('/residentes')
					.send(residente)
					.expect(200)
					.end(function(residenteSaveErr, residenteSaveRes) {
						// Handle Residente save error
						if (residenteSaveErr) done(residenteSaveErr);

						// Delete existing Residente
						agent.delete('/residentes/' + residenteSaveRes.body._id)
							.send(residente)
							.expect(200)
							.end(function(residenteDeleteErr, residenteDeleteRes) {
								// Handle Residente error error
								if (residenteDeleteErr) done(residenteDeleteErr);

								// Set assertions
								(residenteDeleteRes.body._id).should.equal(residenteSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Residente instance if not signed in', function(done) {
		// Set Residente user 
		residente.user = user;

		// Create new Residente model instance
		var residenteObj = new Residente(residente);

		// Save the Residente
		residenteObj.save(function() {
			// Try deleting Residente
			request(app).delete('/residentes/' + residenteObj._id)
			.expect(401)
			.end(function(residenteDeleteErr, residenteDeleteRes) {
				// Set message assertion
				(residenteDeleteRes.body.message).should.match('User is not logged in');

				// Handle Residente error error
				done(residenteDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Residente.remove().exec(function(){
				done();
			});	
		});
	});
});
