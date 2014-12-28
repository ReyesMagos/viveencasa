/**
 * ProductoController
 *
 * @description :: Server-side logic for managing productoes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    new: function(req, res) {
        Provedor.find(function(err, provedores) {
            if (err) {
                console.log(err);
                return;
            }
            TipoProducto.find(function(err, tiposDeProducto) {
                //console.log(tiposDeProducto);
                if (err) {
                    console.log(err);
                }
                res.view({
                    provedores: provedores,
                    tiposDeProducto: tiposDeProducto
                });
            });
        });
    },
    create: function(req, res) {
        if (req.param('alto') == "" ||  req.param('alto') == null)
            console.log('Vacion');
        else
            console.log('Vacio1' + req.param('alto'));
        var producto = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            ancho: req.param('ancho'),
            alto: req.param('alto'),
            descripcion: req.param('descripcion'),
            cantidadBodega: req.param('cantidadBodega'),
            garantia: req.param('garantia'),
            precio: req.param('precio'),
            provedor: req.param('provedor'),
            tipoProducto: req.param('tipoProducto')
        }
        Producto.create(producto, function productoCreated(err, producto) {
            if (err) {
                req.session.flash={
                    err:sails.generateErrMessage(err)
                }
                return res.redirect('producto/new/');;
            }
            res.redirect('producto/show/' + producto.id);
        });
    },
    show: function(req, res, next) {
        var socket = req.socket;
        var io = sails.io;
        socket.on('culo', function(msg) {
            console.log('message: ' + msg);
        });
        Producto.findOne(req.param('id'), function productoFounded(err, producto) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log(producto);
            Provedor.findOne(producto.provedor, function provedorFounded(err, provedor) {
                /*/
ImagenProducto.findByProducto(producto.id, function imagesFounded(err, imagenes) {
// body...
res.view({
producto: producto,
provedor: provedor,
imagenes:imagenes
});
});
/*/
                // do stuff
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
                            provedor: provedor,
                            imagenes: imagenes
                        });
                    });
            });
        });
        // body...
    },
    edit: function(req, res) {
        Provedor.find(function provedoresFounded(err, provedores) {
            if (err) {
                console.log(err);
                return;
            }
            TipoProducto.find(function tiposDeProductoFounded(err, tiposDeProducto) {
                if (err) {
                    console.log(err);
                    return;
                }
                Producto.findOne(req.param('id'), function productoFounded(err, producto) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.view({
                        provedores: provedores,
                        tiposDeProducto: tiposDeProducto,
                        producto: producto
                    });
                });
            });
        });
    },
    update: function(req, res, next) {
        var producto = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            ancho: req.param('ancho'),
            alto: req.param('alto'),
            descripcion: req.param('descripcion'),
            cantidadBodega: req.param('cantidadBodega'),
            garantia: req.param('garantia'),
            precio: req.param('precio'),
            provedor: req.param('provedor'),
            tipoProducto: req.param('tipoProducto')
        }
        Producto.update(req.param('id'), producto, function productoUpdated(err) {
            if (err)
                return next(err);
            res.redirect('producto/show/' + req.param('id'));
        });
    },
    index: function(req, res, next) {
        Producto.find().limit(15).exec(function productosFounded(err, productos) {
            if (err)
                return next(err);
            ImagenProducto.find(function imagenesFounded(err, imagenes) {
                if (err)
                    return next(err);
                res.view({
                    productos: productos,
                    imagenes: imagenes
                });
            });
        });
    },
    destroy: function(req, res, next) {
        Producto.destroy(req.param('id'), function productoDestroyed(err) {
            // body...
            if (err)
                return next(err);
            ImagenProducto.destroy()
                .where({
                    producto: req.param('id')
                })
                .exec(function(err, imagenes) {
                    // body...
                    if (err)
                        return next(err);
                    res.redirect('/producto');
                });
        });
    },
    indexByProvider: function(req, res, next) {
        Producto.find()
            .where({
                provedor: req.param('id')
            })
            .exec(function(err, productos) {
                // body...
                if (err)
                    return next(err);
                ImagenProducto.find(function imagenesFounded(err, imagenes) {
                    if (err)
                        return next(err);
                    Provedor.findOne(req.param('id'), function provedorFounded(err, provedor) {
                        if (err)
                            return next(err);
                        res.view({
                            productos: productos,
                            imagenes: imagenes,
                            provedor: provedor
                        });
                    });

                });
            });
    },
    indexByType: function(req, res, next) {
        Producto.find()
            .where({
                tipoProducto: req.param('id')
            })
            .exec(function(err, productos) {
                // body...
                if (err)
                    return next(err);
                ImagenProducto.find(function imagenesFounded(err, imagenes) {
                    if (err)
                        return next(err);
                    TipoProducto.findOne(req.param('id'), function provedorFounded(err, tipoProducto) {
                        if (err)
                            return next(err);
                        res.view({
                            productos: productos,
                            imagenes: imagenes,
                            tipoProducto: tipoProducto
                        });
                    });

                });
            });
    },
    loadContent: function(req, res, next) {
        var persona = ['oscar', 'culito', 'amigo'];
        res.send(persona);
    }
};