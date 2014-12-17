/**
* Provedor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	codigo:{
  		type:'integer', 
  		required:true,
      unique:true
  	}, nombre:{
  		type:'string',
  		required:true
  	}, descripcion:{
  		type:'string',
  		required:true
  	}

  }
};

