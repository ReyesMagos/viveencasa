/**
 * CompraController
 *
 * @description :: Server-side logic for managing compras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {

	new: function (req, res, next) {
		
		return res.view();

	}, create:function  (req,res,next) {
        var fechaC=sails.date();
        
        //console.log('Fecha' +fechaC);

		var compra = {
			
            fecha: fechaC,
            cliente: req.param('id')
        }
        
        Compra.create(compra, function compraCreated(err, compra) {
            if (err) {
                console.log(err); //nos muestra el error por consola
                req.session.flash = {
                    err: err
                }
                return res.redirect('/cliente/index');
            }

            console.log('cree');
            return res.redirect('/productocompra/new/'+compra.id);

        });
	} 
	
	
};

