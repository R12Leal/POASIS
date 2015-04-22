'use strict';

// Configuring the new module
angular.module('residentes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Residentes', 'residentes', 'dropdown', '/residentes(/create)?');
		Menus.addSubMenuItem('topbar', 'residentes', 'Lista de residentes', 'residentes');
		Menus.addSubMenuItem('topbar', 'residentes', 'Añadir residente', 'residentes/create');
	}
]);
