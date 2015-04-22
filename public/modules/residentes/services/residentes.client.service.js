'use strict';

//Residentes service used to communicate Residentes REST endpoints
angular.module('residentes').factory('Residentes', ['$resource',
	function($resource) {
		return $resource('residentes/:residenteId', { residenteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);