/**
* Compra.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      codigo:{
        type: 'integer',
        autoIncrement: true
       
      },fecha:{
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
  },
  beforeCreate : function(compra, cb){
        console.log(compra.fecha);
        Compra.count(function  (err, lenght) {
          // body...:
          if(err)
            return cb(err);
            compra.codigo=lenght+1;
            cb();
        });
        
    }
};

