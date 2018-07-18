// Cambio de formulario en el fichero index.html
$('.shange-form').click(function(){
    $('.formulario').animate({
        height: "toggle",
        'padding-top': 'toggle',
        'padding-bottom': 'toggle',
        opacity: 'toggle'
    }, "slow");

    if(document.getElementById("shange-form").innerHTML =="Iniciar Sesión"){
        document.getElementById("shange-form").innerHTML ="Crear Cuenta";
        document.getElementById("title").innerHTML ="Iniciar Sesión | JavaScript";
    }
    else{
        document.getElementById("shange-form").innerHTML="Iniciar Sesión";
        document.getElementById("title").innerHTML ="Registrar | JavaScript";
    }
});