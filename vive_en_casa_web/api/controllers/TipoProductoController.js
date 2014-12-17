/**
 * TipoProductoController
 *
 * @description :: Server-side logic for managing Tipoproductoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    new: function(req, res) {
        res.view();
        // body...
    },
    create: function(req, res, next) {

        var tipoproducto = {
            codigo:req.param('codigo'),
            nombre: req.param('nombre'),
            descripcion: req.param('descripcion')
        }
        TipoProducto.create(tipoproducto, function tipoProductoCreated(err, tipoProducto) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

            } else {
                var tipoProductoCreadoCorrectamente = [{mensaje: 'Tipo de Producto creado correctamente'
                }]
                req.session.flash = {
                    err: err
                }
            }
            return res.redirect('/tipoproducto/new');

        });
    }

};