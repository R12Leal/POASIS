'use strict';

(function() {
	// Residentes Controller Spec
	describe('Residentes Controller Tests', function() {
		// Initialize global variables
		var ResidentesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Residentes controller.
			ResidentesController = $controller('ResidentesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Residente object fetched from XHR', inject(function(Residentes) {
			// Create sample Residente using the Residentes service
			var sampleResidente = new Residentes({
				name: 'New Residente'
			});

			// Create a sample Residentes array that includes the new Residente
			var sampleResidentes = [sampleResidente];

			// Set GET response
			$httpBackend.expectGET('residentes').respond(sampleResidentes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.residentes).toEqualData(sampleResidentes);
		}));

		it('$scope.findOne() should create an array with one Residente object fetched from XHR using a residenteId URL parameter', inject(function(Residentes) {
			// Define a sample Residente object
			var sampleResidente = new Residentes({
				name: 'New Residente'
			});

			// Set the URL parameter
			$stateParams.residenteId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/residentes\/([0-9a-fA-F]{24})$/).respond(sampleResidente);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.residente).toEqualData(sampleResidente);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Residentes) {
			// Create a sample Residente object
			var sampleResidentePostData = new Residentes({
				name: 'New Residente'
			});

			// Create a sample Residente response
			var sampleResidenteResponse = new Residentes({
				_id: '525cf20451979dea2c000001',
				name: 'New Residente'
			});

			// Fixture mock form input values
			scope.name = 'New Residente';

			// Set POST response
			$httpBackend.expectPOST('residentes', sampleResidentePostData).respond(sampleResidenteResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Residente was created
			expect($location.path()).toBe('/residentes/' + sampleResidenteResponse._id);
		}));

		it('$scope.update() should update a valid Residente', inject(function(Residentes) {
			// Define a sample Residente put data
			var sampleResidentePutData = new Residentes({
				_id: '525cf20451979dea2c000001',
				name: 'New Residente'
			});

			// Mock Residente in scope
			scope.residente = sampleResidentePutData;

			// Set PUT response
			$httpBackend.expectPUT(/residentes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/residentes/' + sampleResidentePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid residenteId and remove the Residente from the scope', inject(function(Residentes) {
			// Create new Residente object
			var sampleResidente = new Residentes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Residentes array and include the Residente
			scope.residentes = [sampleResidente];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/residentes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleResidente);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.residentes.length).toBe(0);
		}));
	});
}());