function login(){
    var email = $("#email-1").val();
    var password = $("#pass-1").val();
    SecurityApi.login(email, password)
        .then(function(response){
            var token = response.token;
            window.localStorage.setItem("Token", token); // Registrar el token en local storage.
            window.location = "index.html"; // Redireccionar a index.html
        })
        .catch(function(error){
            document.getElementById("email-1L").setAttribute("class", "AxOyFc AxOyFe");
            document.getElementById("pass-1L").setAttribute("class", "AxOyFc AxOyFe");
            document.getElementById("email-1").setAttribute("class", "error");
            document.getElementById("pass-1").setAttribute("class", "error");
        });
}
function logup(){
    var name = $("#name-2").val();
    var email = $("#email-2").val();
    var password = $("#pass-2A").val();
    var password2 = $("#pass-2B").val();
    if(password == password2){
        SecurityApi.logup(name, email, password)
        .then(function(response){
            document.getElementById("email-1").value=email;
            document.getElementById("pass-1").value=password;
            login(); // logear usuario creado.
        })
        .catch(function(error){
            document.getElementById("email-2").setAttribute("class", "error");
            document.getElementById("email-2L").setAttribute("class", "AxOyFc AxOyFe");

            if (document.getElementById("pass-2A").hasAttribute("class")) {
                document.getElementById("pass-2AL").setAttribute("class", "AxOyFc AxOyFb");
                document.getElementById("pass-2BL").setAttribute("class", "AxOyFc AxOyFb");
                $("#pass-2A").removeClass("error");
                $("#pass-2B").removeClass("error");
            }
        });
    }
    else{
        if (document.getElementById("email-2").hasAttribute("class")) {
            $("#email-2").removeClass("error");
        }
        document.getElementById("pass-2A").setAttribute("class", "error");
        document.getElementById("pass-2B").setAttribute("class", "error");
        document.getElementById("pass-2AL").setAttribute("class", "AxOyFc AxOyFe");
        document.getElementById("pass-2BL").setAttribute("class", "AxOyFc AxOyFe");
    }
}
function logout(){
    var storage = window.localStorage;
    var token = storage.getItem("Token");
    SecurityApi.logout(token)
        .then(function(response){
            storage.removeItem("Token"); // Eliminar el Token, del Storage.
            window.location="login.html"; // Re-direccional a la página de inicio.
        })
        .catch(function(error){
            console.log("Error: ", error);
        });
}
window.onload = function(){
    $("#btn-1").click(function(){
        login();
    });

    $("#btn-2").click(function(){
        logup();
    });

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
}