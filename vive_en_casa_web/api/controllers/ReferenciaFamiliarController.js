/**
 * ReferenciaFamiliarController
 *
 * @description :: Server-side logic for managing tiporeferencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	new: function (req, res, next) {
		Cliente.findOne(req.param('id'), function  clienteFounded(err, cliente) {
			if(err){
				return next('err');
			}
			return res.view({cliente:cliente});
		});
		

	}, create:function  (req, res, next) {
		var referencia={
			nombre:req.param('nombre'),
			apellido:req.param('apellido'),
			telefono:req.param('telefono'),
			direccion:req.param('direccion'),
			parentezco:req.param('parentezco'),
			propietario:req.param('id')
		}

		ReferenciaFamiliar.create(referencia, function referenciaFamiliarCreated (err, Referencia) {
			if (err){
				console.log('ssss-->'+err.status);//nos muestra el error por consola
				var error=[{Error:''}];
				if(err.status=='400'){
					error=[{Error:'Informacion Invalida'}];
				}
				req.session.flash ={
					err: error
				}
			}else{
				var referenciaFamiliarCreada=[{mensaje:'La referencia familiar fue creada exitosamente'}]
				console.log('ssss-->'+referenciaFamiliarCreada);

				req.session.flash={
					err:referenciaFamiliarCreada
				}
			}
			return res.redirect('/referenciafamiliar/new/'+req.param('id'));
		});
	},  edit:function  (req,res,next) {
		
		ReferenciaFamiliar.findOne(req.param('id') ,function referenciaFounded (err, referencia) {
			if(err){
				console.log(err);//
				next(err);
				return;
			}
			
			return res.view({referencia:referencia});
		});
	}, update: function (req,res,next) {
		var referencia={
			nombre:req.param('nombre'),
			apellido:req.param('apellido'),
			telefono:req.param('telefono'),
			direccion:req.param('direccion'),
			parentezco:req.param('parentezco')
			
		}
		ReferenciaFamiliar.update(req.param('id'), referencia, function referenciaUpdated (err, referenciaa) {
			if(err){
				return next(err);
			}
			return res.redirect('/cliente/show/'+req.param('propietario'));
		});
	}, destroy: function (req,res,next) {
		ReferenciaFamiliar.destroy(req.param('id'), function referenciaRemoved (err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/cliente/show/'+req.param('propietario'));
		});
		
	}

	
};

