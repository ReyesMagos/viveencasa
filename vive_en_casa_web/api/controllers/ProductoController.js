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
                console.log(err);
                return;
            }
            res.redirect('producto/show/' + producto.id);
        });
    },
    show: function(req, res, next) {
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
        Producto.find(function productosFounded(err, productos) {
            if (err)
                return next(err);
            res.view({
                productos: productos
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
    }
};