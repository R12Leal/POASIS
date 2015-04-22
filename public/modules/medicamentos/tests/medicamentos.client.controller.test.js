'use strict';

(function() {
	// Medicamentos Controller Spec
	describe('Medicamentos Controller Tests', function() {
		// Initialize global variables
		var MedicamentosController,
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

			// Initialize the Medicamentos controller.
			MedicamentosController = $controller('MedicamentosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Medicamento object fetched from XHR', inject(function(Medicamentos) {
			// Create sample Medicamento using the Medicamentos service
			var sampleMedicamento = new Medicamentos({
				name: 'New Medicamento'
			});

			// Create a sample Medicamentos array that includes the new Medicamento
			var sampleMedicamentos = [sampleMedicamento];

			// Set GET response
			$httpBackend.expectGET('medicamentos').respond(sampleMedicamentos);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.medicamentos).toEqualData(sampleMedicamentos);
		}));

		it('$scope.findOne() should create an array with one Medicamento object fetched from XHR using a medicamentoId URL parameter', inject(function(Medicamentos) {
			// Define a sample Medicamento object
			var sampleMedicamento = new Medicamentos({
				name: 'New Medicamento'
			});

			// Set the URL parameter
			$stateParams.medicamentoId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/medicamentos\/([0-9a-fA-F]{24})$/).respond(sampleMedicamento);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.medicamento).toEqualData(sampleMedicamento);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Medicamentos) {
			// Create a sample Medicamento object
			var sampleMedicamentoPostData = new Medicamentos({
				name: 'New Medicamento'
			});

			// Create a sample Medicamento response
			var sampleMedicamentoResponse = new Medicamentos({
				_id: '525cf20451979dea2c000001',
				name: 'New Medicamento'
			});

			// Fixture mock form input values
			scope.name = 'New Medicamento';

			// Set POST response
			$httpBackend.expectPOST('medicamentos', sampleMedicamentoPostData).respond(sampleMedicamentoResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Medicamento was created
			expect($location.path()).toBe('/medicamentos/' + sampleMedicamentoResponse._id);
		}));

		it('$scope.update() should update a valid Medicamento', inject(function(Medicamentos) {
			// Define a sample Medicamento put data
			var sampleMedicamentoPutData = new Medicamentos({
				_id: '525cf20451979dea2c000001',
				name: 'New Medicamento'
			});

			// Mock Medicamento in scope
			scope.medicamento = sampleMedicamentoPutData;

			// Set PUT response
			$httpBackend.expectPUT(/medicamentos\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/medicamentos/' + sampleMedicamentoPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid medicamentoId and remove the Medicamento from the scope', inject(function(Medicamentos) {
			// Create new Medicamento object
			var sampleMedicamento = new Medicamentos({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Medicamentos array and include the Medicamento
			scope.medicamentos = [sampleMedicamento];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/medicamentos\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMedicamento);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.medicamentos.length).toBe(0);
		}));
	});
}());