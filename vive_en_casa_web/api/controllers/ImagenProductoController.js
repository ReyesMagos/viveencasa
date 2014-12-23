/**
 * ImagenproductoController
 *
 * @description :: Server-side logic for managing imagenproductoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res) {
        console.log(req.param('id'));

        Producto.findOne(req.param('id'), function productoFounded(err, producto) {
            if (err) {
                console.log(err);
                return;
            }

            res.view({
                producto: producto
            });
        });
    },
    upload: function(req, res) {
        console.log('Imprimo' +req.query);
        if (req.file('imagenProducto')._files.length>0) {
            var filename1 = req.file('imagenProducto')._files[0].stream.filename;
            var filename1 = req.file('imagenProducto')._files[0].stream.filename;
            var imagenProducto = req.file('imagenProducto');
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
        }else{
            console.log('else');
            req.session.flash={
                err:[{mensaje:'No selecciono imagen'}]
            }
            res.redirect('/producto/edit/'+req.param('id'));
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
            if (err)
                console.log(err);
            req.session.flash={
                err:[{mensaje:'Imagen Subida Exitosamente'}]
            }
            res.redirect('/producto/edit/' + req.param('producto'))

        });

    }
    // bodyre    }
};