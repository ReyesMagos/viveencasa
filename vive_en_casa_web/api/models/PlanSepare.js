/**
* PlanSepare.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    codigo:{
      type: 'integer',
      autoIncrement: true
    },numeroCuotas:{
  		type:'integer',
  		required:true
  	},fecha:{
      type:'string',
      required:true
    },valorTotal:{
      type:'float'
    },fechaFinPago:{
  		type:'string',
  		required:true
  	},cliente:{
  		model:'Cliente'
  	}, productoplansepare:{
  		collection:'productoplansepare',
  		via:'productoPlanSepare'
  	}
  }
};

