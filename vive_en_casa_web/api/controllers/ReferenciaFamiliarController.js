/**
 * TipoReferenciaController
 *
 * @description :: Server-side logic for managing tiporeferencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	new: function (req, res) {
		res.view();
	}, create:function  (req, res, next) {
		var referencia={
			nombre:req.param('nombre'),
			apellido:req.param('apellido'),
			telefono:req.param('telefono'),
			direccion:req.param('direccion'),
			parentezco:req.param('parentezco')
		}

		ReferenciaFamiliar.create(referencia, function tipoReferenciaCreated (err, Referencia) {
			if (err){
				console.log(err);//nos muestra el error por consola
				return next(err);//muestra el error redirige a la pag
			}
		});
	}
	
};

