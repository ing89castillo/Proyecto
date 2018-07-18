(function(){

    function blur (id){
        if(document.getElementById(id).value != ""){
            document.getElementById(id+"L").setAttribute("class", "AxOyFc AxOyFb");
        }
        else{
            document.getElementById(id+"L").setAttribute("class", "AxOyFc AxOyFe");
        }
    }

    document.getElementById("email-1").addEventListener("blur", function(){blur("email-1")});
    document.getElementById("pass-1").addEventListener("blur", function(){blur("pass-1")});

    document.getElementById("name-2").addEventListener("blur", function(){blur("name-2")});
    document.getElementById("email-2").addEventListener("blur", function(){blur("email-2")});
    document.getElementById("pass-2A").addEventListener("blur", function(){blur("pass-2A")});
    document.getElementById("pass-2B").addEventListener("blur", function(){blur("pass-2B")});
}())
