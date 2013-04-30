function infoProducto(cod) {


    cadena = String(cod);
    randy = cadena.substring(cadena.length - 1, cadena.length);

    ///GUARDANDO EL CODIGO
    window.localStorage.setItem("COD", randy);

    $("#car").hide();
    $("#productInfo").show();

    $("#nombre").html(nombres[randy]);
    $("#codigo").html(cod);
    $("#precio").html('Bs. ' + precios[randy]);
    $("#cantidad").val(1);


    var current = '<img src="images/00' + randy + '.jpg"/>';
    $("#publicidad").html(current);

}


var escanear = function() {

    $("#productInfo").hide();

    var code;

    window.plugins.barcodeScanner.scan(
            function(result) {
                if (result.cancelled) {
                    code = 0;
                } else {
                    code = result.text;
                    infoProducto(code);

                }
            },
            function(error) {
                alert("scanning failed: " + error);
                code = 0;
            }
    );

}



function addToCart() {

    $("#productInfo").hide();
    $("#car").show();

    var codi = window.localStorage.getItem("COD");
    var total = window.localStorage.getItem("TOTAL");

    var subtotal = precios[codi] * $("#cantidad").val();
    var finTotal = Number(total) + Number(subtotal);
    window.localStorage.setItem("TOTAL", finTotal);

    $('#total').html(finTotal);

    var item = '<li><h3 style="color:blue">' + nombres[codi] + '</h3><p class="edit"><span style="float: left"> <b>Precio (Bs):</b>&nbsp;' + precios[codi] + '&nbsp;  <b>Cant:</b>&nbsp;' + $("#cantidad").val() + '&nbsp;</span>\n\
                <span style="float: right; text-align: right"> <b>Subtotal:</b>&nbsp;Bs&nbsp;' + subtotal + '&nbsp;</span> </p></li>';

    $('#carrito').append(item);
    $('#carrito').listview('refresh');
}


function addToList() {

    var item = '<li><h3 style="color:blue">' + $("#nombre2").val() + '</h3><p class="edit"> <b>Cant:</b>&nbsp;' + $("#cant2").val() + '&nbsp;</span></p></li>';
    

    $('#prodList').append(item);
    $('#prodList').listview('refresh');

}