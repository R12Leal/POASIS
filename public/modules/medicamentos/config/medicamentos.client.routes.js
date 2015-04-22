'use strict';

//Setting up route
angular.module('medicamentos').config(['$stateProvider',
	function($stateProvider) {
		// Medicamentos state routing
		$stateProvider.
		state('listMedicamentos', {
			url: '/medicamentos',
			templateUrl: 'modules/medicamentos/views/list-medicamentos.client.view.html'
		}).
		state('createMedicamento', {
			url: '/medicamentos/create',
			templateUrl: 'modules/medicamentos/views/create-medicamento.client.view.html'
		}).
		state('viewMedicamento', {
			url: '/medicamentos/:medicamentoId',
			templateUrl: 'modules/medicamentos/views/view-medicamento.client.view.html'
		}).
		state('editMedicamento', {
			url: '/medicamentos/:medicamentoId/edit',
			templateUrl: 'modules/medicamentos/views/edit-medicamento.client.view.html'
		});
	}
]);