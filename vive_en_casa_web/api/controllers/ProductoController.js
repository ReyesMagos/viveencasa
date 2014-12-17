/**
 * ProductoController
 *
 * @description :: Server-side logic for managing productoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res) {
        Provedor.find(function (err, provedores) {
            if (err) {
                console.log(err);
                return;
            }

            TipoProducto.find(function (err, tiposDeProducto) {
                //console.log(tiposDeProducto);
                if(err){
                	console.log(err);
                }
                res.view({
                    provedores: provedores,
                    tiposDeProducto: tiposDeProducto
                });
              
            });

        });
    }
};