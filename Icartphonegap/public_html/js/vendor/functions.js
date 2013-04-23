
/*
 * funcion de inicializado para acciones phonegap
 * @returns {undefined}
 */

function init() {

    document.addEventListener("deviceready", onDeviceReady, false);
    delete init;
}


/*
 * metodo para salir de la aplicacion a partir del un alerta de confirmacion
 * @returns {undefined}
 */
function exitAppl() {

    navigator.notification.confirm(
            '¿Desea salir de la aplicación?', // message
            onExit, // callback to invoke with index of button pressed
            appname, // title
            'Ok,cancelar'          // buttonLabels
            );

}

/*
 * metodo que llama la funcion luego de la orden de salir de la aplicacion
 * @param {int} buttonIndex:boton que representa la opcion seleccionada
 * @returns {undefined}
 */
function onExit(buttonIndex) {
    if (buttonIndex == 1)
        navigator.app.exitApp();
}



/*
 * alerta para telefonos
 * @param {string} message: recibe el mensaje que se necesita comunicar
 * @returns {string}
 */
function alert(message) {

    navigator.notification.alert(message, false, appname, "Ok");

}
/*
 * beep para telefonos
 * @param {int} veces que sonara el dispositivo
 * @returns {sound}
 */
function beep(times) {
    navigator.notification.beep(times);
}
/*
 * vibracion para moviles
 * @param {int} mlseg: milisegundos en que vibrara el dispositivo
 * @returns {undefined}
 */
function vibrate(mlseg) {
    navigator.notification.vibrate(mlseg);
}


/*
 * agrega un elemento hidden con id y value a un formulario especifico.
 * @param {string} ide
 * @param {string} valor
 * @param {string} formulario
 * @returns {undefined}
 */
function addFieldToForm(ide, valor, formulario) {

    $('<input>').attr({
        type: 'hidden',
        id: ide,
        name: ide,
        value: valor
    }).appendTo(formulario);
}

/*
 * funcion para saber si algo anda mal dada la respuesta del request ajax
 * @param {request ajax} data respuesta ajax
 * @param {string} esperado valor esperado
 * @returns {undefined}
 */
function isOkResult(data, esperado) {
    if (data == esperado) {
        alert("cambios efectuados correctamente");
    } else {
        vibrate(200);
        alert("lamentablemente el proceso no pudo concluir, por favor intente mas tarde");
        return false;
    }
}

/*
 * determina si hay una conexion a internet
 * @param {NO)
 * @returns {boolean}
 */
function isOnline() {

    var conexion = checkConnection();
    if (conexion.value == 0) {
        vibrate(300);
        alert("No se ha detectado conexion a Internet");
        return false;
    } else {
        return true;
    }
}
/*
 * funcion que notifica que fallo el acceso remoto al servidor
 * @returns {mensaje de alerta}
 */
function offLine() {

    var conexion = checkConnection();
    vibrate(200);
    alert("Error: no se ha podido tener acceso al servidor usando: " + conexion.message);
}

/*
 * chequea la conexion a internet
 * @returns {vector}
 */

function checkConnection() {
    var objConnection = navigator.connection;
    var connectionInfo = getConnectionType(objConnection.type);
    return connectionInfo;

}

/*
 * me trae un vector con el tipo de conexion a internet
 */

function getConnectionType(type) {
    var connTypes = {};
    connTypes[Connection.NONE] = {
        message: 'No network connection',
        value: 0
    };
    connTypes[Connection.UNKNOWN] = {
        message: 'Unknown connection',
        value: 1
    };
    connTypes[Connection.ETHERNET] = {
        message: 'Ethernet connection',
        value: 2
    };
    connTypes[Connection.CELL_2G] = {
        message: 'Cell 2G connection',
        value: 3
    };
    connTypes[Connection.CELL_3G] = {
        message: 'Cell 3G connection',
        value: 4
    };
    connTypes[Connection.CELL_4G] = {
        message: 'Cell 4G connection',
        value: 5
    };
    connTypes[Connection.WIFI] = {
        message: 'WiFi connection',
        value: 6
    };
    return connTypes[type];
}



/*
 * redirige al destino seleccionado
 * target: url de la pagina 
 * @returns {undefined}
 */

function goToUrl(target){
    location.replace(target+'.html');

}

/*
 * funcion para cerrar sesion
 */
function logout() {

    window.localStorage.clear();
    $(location).attr('href', 'index.html');
}

