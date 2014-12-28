module.exports = function(err) {
    var message;
    errJson = err.toJSON();
    console.log(errJson);
    switch (err.status) {
        case 400:
            message =  'Informacion  Invalida para el ' + errJson.model + ' , verifique Por Favor los siguientes atributos: ' + getPropertiesNames(errJson.invalidAttributes);
            return message;
        case 401:
            message = [{
                Mensaje: 'No esta Autorizado para realizar esta accion'
            }]
            return message;
        case 403:
            message = [{
                Mensaje: 'Prohibido realizar esta accion'
            }]
            return message;
        case 404:
            message = [{
                Mensaje: 'No Encontrado'
            }]
            return message;
        case 500:
            message = [{
                Mensaje: 'Error interno comuniquese con el administrador del sistema'
            }]
            return message;
        case 503:
            message = [{
                Mensaje: 'Servicio no Disponible'
            }]
            return message;
        default:
            message = [{
                Mensaje: 'Error, comuniquese con el administrador del sistema'
            }]
            return message;
    }

};

function getPropertiesNames(obj) {
    var message='';
    for (var key in obj) {
        message += key + ', ';

        // do some more stuff with obj[key]
    }
    return message;
}