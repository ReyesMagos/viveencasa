/**
* ReferenciaComercial.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	nombre:{
  		type:'string',
  		required:true
  	},apellido:{
      type:'string',
      required:true
    }, telefono:{
		type:'integer',
		required:true
  	},direccion:{
		type:'string',
		required:true
  	}, capacidadEndeudamiento:{
  		type:'float',
  		required:true
  	}, infoPago:{
  		type:'string',
  		required:true
  	},propietario:{
  		model:'Cliente'
  	}
  }
};

