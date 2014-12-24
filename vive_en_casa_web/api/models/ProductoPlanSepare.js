/**
* ProductoPlanSepare.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    descripcion:{
      type:'string'
    },cantidad:{
      type:'integer',
      required:true
    },excedentePago:{
  		type:'float',
  		required:true
  	},productoPlanSepare:{
  		model:'PlanSepare'
  	}, producto:{
      model:'Producto'
    }
  }
};

