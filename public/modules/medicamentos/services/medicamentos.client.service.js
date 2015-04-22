'use strict';

//Medicamentos service used to communicate Medicamentos REST endpoints
angular.module('medicamentos').factory('Medicamentos', ['$resource',
	function($resource) {
		return $resource('medicamentos/:medicamentoId', { medicamentoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);