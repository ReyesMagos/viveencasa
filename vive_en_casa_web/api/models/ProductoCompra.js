/**
* ProductoCompra.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	cantidad:{
  		type:'integer',
  		required: true
  	}, descripcion:{
  		type:'string',
  		required:true
  	}, compra:{
  		model: 'Compra'
  	}, producto:{
  		model: 'Producto'
  	}
  }
};

