'use strict';

//Setting up route
angular.module('residentes').config(['$stateProvider',
	function($stateProvider) {
		// Residentes state routing
		$stateProvider.
		state('listResidentes', {
			url: '/residentes',
			templateUrl: 'modules/residentes/views/list-residentes.client.view.html'
		}).
		state('createResidente', {
			url: '/residentes/create',
			templateUrl: 'modules/residentes/views/create-residente.client.view.html'
		}).
		state('viewResidente', {
			url: '/residentes/:residenteId',
			templateUrl: 'modules/residentes/views/view-residente.client.view.html'
		}).
		state('editResidente', {
			url: '/residentes/:residenteId/edit',
			templateUrl: 'modules/residentes/views/edit-residente.client.view.html'
		});
	}
]);