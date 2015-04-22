    /* jshint ignore:start */
(function() {
    'use strict';

    angular
        .module('medicamentos')
        .factory('MedicamentosForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'nombre_medicamento',
  					type: 'input',
  					templateOptions: {
              label: 'Nombre del medicamento:',
              placeholder: 'Nombre',
  						disabled: disabled
  			    }
  				},
          {
            key: 'nombre_laboratorio',
            type: 'input',
            templateOptions: {
              label: 'Nombre del laboratorio:',
              placeholder: 'Laboratorio',
              disabled: disabled
            }
          }
  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }


})();
  /* jshint ignore:end */