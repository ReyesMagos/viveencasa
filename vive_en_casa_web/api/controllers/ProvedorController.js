/**
 * ProvedorController
 *
 * @description :: Server-side logic for managing provedors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res) {
        // body...
        res.view();

    },
    create: function(req, res) {
        // body...
        var prov = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            descripcion: req.param('descripcion')
        }

        Provedor.create(prov, function provedorCreated(err, provedor) {
            if (err) {
                req.session.flash = {
                    err: err
                }

            } else {
                var provedorCreadoCorrectamente = [{
                    mensaje: 'Provedor creado correctamente'
                }]
                req.session.flash = {
                    err: provedorCreadoCorrectamente
                }

            }
            return res.redirect('/provedor/new/');

        });
    },
    edit: function(req, res, next) {
        Provedor.findOne(req.param('id'), function provedorFounded(err, provedor) {
            // body...
            if (err) {

                return next(err);
            }
            res.view({
                provedor: provedor
            });
        });

    },
    update: function(req, res, next) {
        var prov = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            descripcion: req.param('descripcion')
        }

        Provedor.update(req.param('id'), prov, function provedorUpdated(err) {
            // body...
            if (err) {
                console.log('error' + err.code);
                /*/
                var myJsonString = JSON.stringify(err);
                console.log('json '+myJsonString);
                /*/
                var error = [{
                    mensaje: 'Algo Salio Mal Intentelo de Nuevo'
                }];
                console.log('status ' + req.session.id);

                if (err.status == '400') {

                    req.session.flash = {
                        err: error
                    }
                    return res.redirect('/provedor/edit/' + req.param('id'));
                }

            }

            res.redirect('/provedor/show/' + req.param('id'));
        });
        // body...
    },
    show: function(req, res, next) {
        Provedor.findOne(req.param('id'), function provedorFounded(err, provedor) {
            // body...
            if (err) {

                return next(err);
            }
            res.view({
                provedor: provedor
            });
        });
    },  /*/,
    index: function(req, res, next) {
      
        Provedor.find(function provedoresFounded(err, provedores) {
            if (err) {
                return next(err);
            }

            res.view({
                provedores: provedores
            });
        });

    },/*/destroy:function (req,res, next) {
        Provedor.destroy(req.param('id'), function  (err) {
            // body...
            if(err){
                return next(err);
            }
            res.resdirect('/provedor/index');
        });
    }

};