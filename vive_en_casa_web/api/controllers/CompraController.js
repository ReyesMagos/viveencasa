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
		/*Cliente.findOne(req.param('id'), function clienteFounded(err, cliente) {
            if (err) {
                console.log(err); //
                next(err);
                return;
            }
            console.log(cliente.id);
            return res.view({
                cliente: cliente
            });
        });*/
		var x=new Date();
		var dia=x.getDate();
		var mes=x.getMonth()+1;
		var hora=x.getHours();
		var año=x.getFullYear();
		var minutos=x.getMinutes();

        var fechaC=dia+'/'+mes+'/'+año+' '+hora+':'+minutos;
        
        console.log(fechaC);

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

