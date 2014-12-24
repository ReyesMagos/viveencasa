/**
 * ProductoCompraController
 *
 * @description :: Server-side logic for managing productocompras
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	new: function (req, res, next) {
		
		Compra.findOne(req.param('id'), function compraFounded(err, compra) {
            if (err) {
                console.log(err); //
                next(err);
                return;
            }


            Producto.find(function productosFounded (err, productos) {
            	if (err) {
                console.log(err); //
                next(err);
                return;
            }

            res.view({
                    compra: compra,
                    productos: productos
                    
                });
            });
               
                       
        });

	}, create:function  (req,res,next) {
		/**/
		
		var productocompra = {
            cantidad: req.param('cantidad'),
            descripcion: req.param('descripcion'),
            compra:req.param('compra'),
            valorUnitario:req.param('valorUnitario'),
            producto:req.param('producto')
        }
        
        ProductoCompra.create(compra, function productoCompraCreated(err, productocompra) {
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

