/**
* Referencias.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  		tipoDocumento:{
  			type:'string',
  			required:true,
  			enum: ['Cédula', 'Pasaporte']
  		}, documento:{
  			type:'integer',
  			required:true,
  			unique: true
  		}, nombre:{
  			type:'string',
  			required:true
  		}, apellido:{
  			type:'string',
  			required:true
  		}, telefono:{
  			type:'integer',
  			required:true
  		}, celular:{
  			type:'integer'
  			
  		}, email:{
  			type:'email',
  			required:true
  		},direccion:{
  			type:'string',
  			required:true
  		}, fechaNacimiento:{
  			type:'string',
  			required:true
  		},referenciasFamiliares:{
  			collection: 'ReferenciaFamiliar',
  			via: 'propietario'
  		},referenciasComerciales:{
  			collection: 'ReferenciaComercial',
  			via: 'propietario'
  		}, compra:{
        collection:'Compra',
        via: 'cliente'
      }, planSepare:{
        collection:'planSepare',
        via: 'cliente'
      }
  }
};

