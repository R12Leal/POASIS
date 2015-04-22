'use strict';

// Medicamentos controller
angular.module('medicamentos').controller('MedicamentosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Medicamentos', 'TableSettings', 'MedicamentosForm',
	function($scope, $stateParams, $location, Authentication, Medicamentos, TableSettings, MedicamentosForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Medicamentos);
		$scope.medicamento = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = MedicamentosForm.getFormFields(disabled);
		};


		// Create new Medicamento
		$scope.create = function() {
			var medicamento = new Medicamentos($scope.medicamento);

			// Redirect after save
			medicamento.$save(function(response) {
				$location.path('medicamentos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Medicamento
		$scope.remove = function(medicamento) {

			if ( medicamento ) {
				medicamento = Medicamentos.get({medicamentoId:medicamento._id}, function() {
					medicamento.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.medicamento.$remove(function() {
					$location.path('medicamentos');
				});
			}

		};

		// Update existing Medicamento
		$scope.update = function() {
			var medicamento = $scope.medicamento;

			medicamento.$update(function() {
				$location.path('medicamentos/' + medicamento._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewMedicamento = function() {
			$scope.medicamento = Medicamentos.get( {medicamentoId: $stateParams.medicamentoId} );
			$scope.setFormFields(true);
		};

		$scope.toEditMedicamento = function() {
			$scope.medicamento = Medicamentos.get( {medicamentoId: $stateParams.medicamentoId} );
			$scope.setFormFields(false);
		};

	}

]);
