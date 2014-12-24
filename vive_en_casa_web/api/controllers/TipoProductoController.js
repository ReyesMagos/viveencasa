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
            codigo: req.param('codigo'),
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
                var tipoProductoCreadoCorrectamente = [{
                    mensaje: 'Tipo de Producto creado correctamente'
                }]
                req.session.flash = {
                    err: err
                }
            }
            return res.redirect('/tipoproducto/new');

        });
    },
    show: function(req, res, next) {
        TipoProducto.findOne(req.param('id'), function tipoProductoFounded(err, tipoProducto) {
            if (err)
                return next(err);
            res.view({
                tipoProducto: tipoProducto
            });

        });
        // body...
    },
    index: function(req, res, next) {

        TipoProducto.find(function(err, tiposProducto) {
            if (err)
                return next(err);
            res.view({
                tiposProducto: tiposProducto
            });
        });
    },
    edit: function(req, res, next) {
        TipoProducto.findOne(req.param('id'), function tipoProductoFounded(err, tipoProducto) {
            if (err)
                return next(err);
            res.view({
                tipoProducto: tipoProducto
            });

        });
    },
    update: function(req, res, next) {
        var tipoproducto = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            descripcion: req.param('descripcion')
        }
        TipoProducto.update(req.param('id'), tipoproducto, function tipoProductoUpdated(err) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/tipoproducto/edit/' + req.param('id'));
            }


            return res.redirect('/tipoproducto/show/' + req.param('id'));

        });
    },
    destroy: function(req, res, next) {
        TipoProducto.destroy(req.param('id'), function tipoProductoDestroyed (err) {
            // body...
            if(err)
                return next(err);
            res.redirect('/tipoproducto/index')
        });
    }

};