/**
* Compra.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		fecha:{
  			type: 'string',
  			required: true
  		},valorTotal:{
        type:'float'
      },cliente:{
  			model:'Cliente'
  		},productocompra:{
  			collection: 'productocompra',
  			via:'compra'
  		}
  }
};

