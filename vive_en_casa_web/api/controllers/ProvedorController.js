/**
 * ProvedorController
 *
 * @description :: Server-side logic for managing provedors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	new:function (req, res) {
		// body...
		res.view();

	}, create: function  (req, res) {
		// body...
		var prov ={
			codigo: req.param('codigo'),
			nombre:req.param('nombre'),
			descripcion:req.param('descripcion')
		}

		Provedor.create(prov, function provedorCreated (err, provedor) {
			if(err){
				req.session.flash={
					err: err
				}

			}else{
				var provedorCreadoCorrectamente= [{mensaje: 'Provedor creado correctamente'}]
				req.session.flash={
					err: provedorCreadoCorrectamente
				}

			}
			return res.redirect('/provedor/new/');

		});
	}
	
};

