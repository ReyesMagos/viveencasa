/**
 * ReferenciaComercialController
 *
 * @description :: Server-side logic for managing Referenciacomercials
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
			capacidadEndeudamiento:req.param('capacidadEndeudamiento'),
			infoPago:req.param('infoPago'),
			propietario:req.param('id')

		}

		ReferenciaComercial.create(referencia, function referenciaCreated (err, Referencia) {
			if (err){
				console.log(err);//nos muestra el error por consola
				req.session.flash ={
					err: err
				}
			}else{
				var referenciaComercialCreada=[{mensaje:'La referencia comercial fue creada exitosamente'}]
				req.session.flash={
					err:referenciaComercialCreada
				}
			}
			return res.redirect('/referenciacomercial/new/'+req.param('id'));
		});
	}, edit:function  (req,res,next) {
		
		ReferenciaComercial.findOne(req.param('id') ,function referenciaFounded (err, referencia) {
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
			capacidadEndeudamiento:req.param('capacidadEndeudamiento'),
			infoPago:req.param('infoPago')
			
		}
		ReferenciaComercial.update(req.param('id'), referencia, function referenciaUpdated (err, referenciaa) {
			if(err){
				return next(err);
			}
			return res.redirect('/cliente/show/'+req.param('propietario'));
		});
	}, destroy: function (req,res,next) {
		ReferenciaComercial.destroy(req.param('id'), function referenciaRemoved (err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/cliente/show/'+req.param('propietario'));
		});
		
	}

};

