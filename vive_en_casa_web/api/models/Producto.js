/**
 * Producto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        codigo: {
            type: 'integer',
            unique: true,
            required: true
        },
        nombre: {
            type: 'string',
            required: true
        },ancho: {
            type: 'float'
        },alto: {
            type: 'float'
        },descripcion: {
            type: 'string',
            required: true
        },cantidadBodega: {
            type: 'integer'
        },garantia: {
            type: 'string',
            required: true
        },precio:{
            type:'float',
            required:true
        },
        provedor: {
            model: 'provedor',
            required: true
        },
        tipoProducto: {
            model: 'tipoproducto',
            required: true
        },
        imagenesProducto: {
            collection: 'imagenproducto',
            via: 'producto'

        }, productoCompra:{
            collection:'productoCompra',
            via: 'producto'
        }, productoPlanSepare:{
            collection:'productoPlanSepare',
            via: 'productoPlanSepare'
        }

    }
};