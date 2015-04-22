'use strict';

// Residentes controller
angular.module('residentes').controller('ResidentesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Residentes', 'TableSettings', 'ResidentesForm',
	function($scope, $stateParams, $location, Authentication, Residentes, TableSettings, ResidentesForm ) {
		$scope.authentication = Authentication;
		$scope.tableParams = TableSettings.getParams(Residentes);
		$scope.residente = {};

		$scope.setFormFields = function(disabled) {
			$scope.formFields = ResidentesForm.getFormFields(disabled);
		};


		// Create new Residente
		$scope.create = function() {
			var residente = new Residentes($scope.residente);

			// Redirect after save
			residente.$save(function(response) {
				$location.path('residentes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Residente
		$scope.remove = function(residente) {

			if ( residente ) {
				residente = Residentes.get({residenteId:residente._id}, function() {
					residente.$remove();
					$scope.tableParams.reload();
				});

			} else {
				$scope.residente.$remove(function() {
					$location.path('residentes');
				});
			}

		};

		// Update existing Residente
		$scope.update = function() {
			var residente = $scope.residente;

			residente.$update(function() {
				$location.path('residentes/' + residente._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};



		$scope.toViewResidente = function() {
			$scope.residente = Residentes.get( {residenteId: $stateParams.residenteId} );
			$scope.setFormFields(true);
		};

		$scope.toEditResidente = function() {
			$scope.residente = Residentes.get( {residenteId: $stateParams.residenteId} );
			$scope.setFormFields(false);
		};

	}

]);
