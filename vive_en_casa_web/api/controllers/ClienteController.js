/**
 * ReferenciasController
 *
 * @description :: Server-side logic for managing Referencias
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    new: function(req, res) {
        res.view();
    },
    create: function(req, res, next) {
        var cliente = {
            tipoDocumento: req.param('tipoDocumento'),
            documento: req.param('documento'),
            nombre: req.param('nombre'),
            apellido: req.param('apellido'),
            telefono: req.param('telefono'),
            celular: req.param('celular'),
            direccion: req.param('direccion'),
            email: req.param('email'),
            fechaNacimiento: req.param('fechaNacimiento')
        }

        Cliente.create(cliente, function referenciaFamiliarCreated(err, clientes) {
            if (err) {
                console.log(err); //nos muestra el error por consola
                req.session.flash = {
                    err: err
                }
                return res.redirect('/cliente/new')
            }
            return res.redirect('/cliente/show/' + clientes.id);

        });
    },
    show: function(req, res, next) {
        Cliente.findOne(req.param('id'), function clienteFounded(err, cliente) {
            if (err) {
                console.log(err); //
                return;
            }

            ReferenciaFamiliar.find()
                .where({
                    propietario: cliente.id
                })
                .exec(function(err, refFamiliares) {
                    if (err) {
                        return next(err);
                    }

                    console.log(refFamiliares);
                    ReferenciaComercial.find()
                        .where({
                            propietario: cliente.id
                        })
                        .exec(function(err, refComerciales) {
                            if (err) {
                                return next(err);
                            }

                            res.view({
                                cliente: cliente,
                                refFamiliares: refFamiliares,
                                refComerciales: refComerciales
                            });
                        });

                });

        });




    },
    index: function(req, res, next) {
        Cliente.find(function clienteFounded(err, clientes) {
            if (err) {
                console.log(err); //
                return;
            }
            return res.view({
                clientes: clientes
            });
        });
    },
    edit: function(req, res, next) {
        console.log('entre');
        Cliente.findOne(req.param('id'), function clienteFounded(err, cliente) {
            if (err) {
                console.log(err); //
                next(err);
                return;
            }
            console.log(cliente.id);
            return res.view({
                cliente: cliente
            });
        });
    },
    update: function(req, res, next) {
        var cliente = {
            tipoDocumento: req.param('tipoDocumento'),
            documento: req.param('documento'),
            nombre: req.param('nombre'),
            apellido: req.param('apellido'),
            telefono: req.param('telefono'),
            celular: req.param('celular'),
            direccion: req.param('direccion'),
            email: req.param('email'),
            fechaNacimiento: req.param('fechaNacimiento')
        }
        Cliente.update(req.param('id'), cliente, function clienteUpdated(err) {
            if (err) {
                return next('err');
            }
            return res.redirect('/cliente/show/' + req.param('id'));
        });
    },
    destroy: function(req, res, next) {
        Cliente.destroy(req.param('id'), function clienteRemoved(err) {
            if (err) {
                return next('err');
            }
            return res.redirect('/cliente/index');
        });

    }

};