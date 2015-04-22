/* jshint ignore:start */
(function() {
    'use strict';

    angular
        .module('residentes')
        .factory('ResidentesForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'nombre_residente',
  					type: 'input',
  					templateOptions: {
  			      label: 'Nombre:',
              placeholder: 'Nombre',
  						disabled: disabled
  			    }
  				},
          {
            key: 'apellido1_residente',
            type: 'input',
            templateOptions: {
              label: 'Primer apellido:',
              placeholder: 'Primer apellido',
              disabled: disabled
            }
          },
          {
            key: 'apellido2_residente',
            type: 'input',
            templateOptions: {
              label: 'Segundo apellido:',
              placeholder: 'Segundo apellido',
              disabled: disabled
            }
          },
          {
            key: 'fecha_nacimiento',
            type: 'input',
            templateOptions: {
              label: 'Fecha de nacimiento:',
              type: 'date',
              disabled: disabled
            }
          },
          {
            key: 'fecha_ingreso',
            type: 'input',
            templateOptions: {
              label: 'Fecha de ingreso:',
              type: 'date',
              disabled: disabled
            }
          },
          {
            key: 'ss',
            type: 'input',
            templateOptions: {
              label: 'Seguridad social:',
              placeholder: 'SS',
              disabled: disabled
            }
          },
          {
            key: 'num_hab',
            type: 'input',
            templateOptions: {
              label: 'Habitación:',
              placeholder: 'Habitación',
              disabled: disabled
            }
          },
          {
            key: 'estado',
            type: 'radio',
            templateOptions: {
              label: 'Estado (Por defecto: Activo):',
              disabled: disabled,
              options: [
                {name: 'Activo', value: 'Activo'},
                {name: 'Inactivo', value: 'Inactivo'}
              ]
            }
          },
          {
            key: 'dieta',
            type: 'radio',
            templateOptions: {
              label: 'Dieta:',
              placeholder: 'Dieta',
              disabled: disabled,
              options: [
                {name: 'Normal', value: 'Normal'},
                {name: 'Turmix', value: 'Turmix'},
                {name: 'Blanda', value: 'Blanda'},
                {name: 'Triturada', value: 'Triturada'}
              ]
            }
          },
          {
            key: 'observaciones',
            type: 'textarea',
            templateOptions: {
              label: 'Observaciones:',
              placeholder: 'Observaciones',
              disabled: disabled,
              rows: 4,
              cols: 15
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