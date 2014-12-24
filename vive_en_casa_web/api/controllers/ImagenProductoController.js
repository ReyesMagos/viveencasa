/**
 * ImagenproductoController
 *
 * @description :: Server-side logic for managing imagenproductoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var fs = require('fs');
module.exports = {

    new: function(req, res) {
        console.log(req.param('id'));

        Producto.findOne(req.param('id'), function productoFounded(err, producto) {
            if (err) {
                console.log(err);
                return;
            }
            ImagenProducto.find()
                .where({
                    producto: producto.id
                })
                .exec(function(err, imagenes) {
                    // body...
                    if (err)
                        return next(err);
                    res.view({
                        producto: producto,
                        imagenes: imagenes
                    });
                });

        });
    },
    upload: function(req, res) {
        // Parse form data from 
        console.log('Entre' + req.file('imagen'));
        if (req.file('imagen')._files.length > 0) {
            var filename1 = req.file('imagen')._files[0].stream.filename;
            var imagenProducto = req.file('imagen');
            var uploadPath = process.cwd() + '/assets/images/';
            var prod = req.param('id');
            console.log("PRODCUTO IID " + prod);
            imagenProducto.upload({
                dirname: uploadPath,
                saveAs: filename1
            }, function onUploadComplete(err, files) {
                if (err)
                    return res.serverError(err);
                res.redirect('/imagenproducto/create?producto=' + prod +
                    '&filename=' + filename1);
            });
        } else {
            console.log('else');
            req.session.flash = {
                err: [{
                    mensaje: 'No selecciono imagen'
                }]
            }
            res.redirect('/producto/edit/' + req.param('id'));
        }


    },
    create: function(req, res) {
        var socket = req.socket;
        var io = sails.io;
        var imageUploadMessage = 'Ok';



        imP = {
            filename: req.param('filename'),
            producto: req.param('producto')
        }

        console.log(imP);

        ImagenProducto.create(imP, function imagenProductoCreated(err, imagenProducto) {
            if (err){
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/producto/edit/' + req.param('producto'));
            }

            return res.redirect('/imagenproducto/new/' + req.param('producto'));

        });

    },
    delete: function(req, res, next) {
        console.log('Ruta: ' + process.cwd() + '/assets/images/' + req.param('filename'));
        console.log('Id:' + req.param('id'));


        fs.unlink(process.cwd() + '/assets/images/' + req.param('filename'), function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log('borrado: ' + process.cwd() + '/assets/images/' + req.param('filename'));
            ImagenProducto.destroy(req.param('id'), function imagenProductoDestroyed(err) {
                if (err)
                    return next(err);
                res.redirect('/imagenproducto/new/' + req.param('producto'));
            });
        });

    }

};