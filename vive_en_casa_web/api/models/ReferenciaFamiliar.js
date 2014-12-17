/**
* TipoReferencia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	nombre:{
  		type:'string',
  		required:true
  	}, telefono:{
		type:'integer',
		required:true
  	},direccion:{
		type:'string',
		required:true
  	}, parentezco:{
  		type:'string',
  		required:true,
  		enum: ['Madre', 'Padre', 'Hermano(a)','Hijo(a)','Tío(a)', 'Primo(a)' ]
  	},propietario:{
  		model:'Cliente'
  	}
  }
};

