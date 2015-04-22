'use strict';

// Configuring the new module
angular.module('medicamentos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Medicamentos', 'medicamentos', 'dropdown', '/medicamentos(/create)?');
		Menus.addSubMenuItem('topbar', 'medicamentos', 'Lista de medicamentos', 'medicamentos');
		Menus.addSubMenuItem('topbar', 'medicamentos', 'Añadir medicamento', 'medicamentos/create');
	}
]);
