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
        var altitud = 0;
        var anchitud = 0;
        if (req.param('alto') == "" ||  req.param('alto') == null) {
            altitud = 0;
            console.log("alto vacio mostrare " + altitud);
        } else {
            altitud = req.param('alto');
            console.log("alto no vacio mostrare " + altitud);
        }

        if (req.param('ancho') == "" ||  req.param('ancho') == null) {
            anchitud = 0;
            console.log("ancho vacio mostrare " + anchitud);
        } else {
            anchitud = req.param('ancho');
            console.log("ancho no vacio mostrare " + anchitud);
        }
        var producto = {
            codigo: req.param('codigo'),
            nombre: req.param('nombre'),
            ancho: anchitud,
            alto: altitud,
            descripcion: req.param('descripcion'),
            cantidadBodega: req.param('cantidadBodega'),
            garantia: req.param('garantia'),
            precio: req.param('precio'),
            provedor: req.param('provedor'),
            tipoProducto: req.param('tipoProducto')
        }
        console.log("este es el producto a crear " + producto);
        Producto.create(producto, function productoCreated(err, producto) {
            if (err) {
                req.session.flash = {
                    err: sails.generateErrMessage(err)
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
        Producto.find().limit(3).exec(function productosFounded(err, productos) {
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
        var count = req.param('number');
        console.log(count);
        var persona = ['oscar', 'culito', 'amigo'];
        var skip = 3 * count;
        var count2 = 0;

        console.log('skip: ' + skip);
        //res.send(persona);
        Producto.find().skip(skip).limit(3).exec(function productosFounded(err, productos) {
            if (err)
                return next(err);
            var images = [];
            productos.forEach(function(producto) {
                ImagenProducto.find()
                    .where({
                        producto: producto.id
                    })
                    .exec(function(err, imagess) {

                        images[count2]=imagess.filename;
                        console.log('imagen: ' + JSON.stringify(imagess));
                        count2++;
                        if ((count2 + 1) == 3) {
                            res.send([{
                                productos: productos,
                                imagenes: images
                            }]);
                        }
                    });
            });






        });

    }
};