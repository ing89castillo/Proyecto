var storage = window.localStorage;
var token = storage.getItem("Token");
var stars = [];

if(storage.getItem("Stars")!=undefined){
    stars = JSON.parse(storage.getItem("Stars"));
}
function logout(){
    SecurityApi.logout(token)
        .then(function(response){
            storage.removeItem("Token"); // Eliminar el Token, del Storage.
            window.location="login.html"; // Re-direccional a la página de inicio.
        })
        .catch(function(error){
            console.log("Error: ", error);
        });
}
function UserList(){
    UserApi.Users(token)
        .then(function(ArrayList){
            showPost(ArrayList);
        })
        .catch(function(error){
            console.log("Error: ", error);
        });
}
function createPost(){
    var title = document.getElementById("CommentingTitle").value;
    var body = document.getElementById("CommentingBody").value;
    PostApi.CreatePost(title, body, token)
        .then(function(){
            location.reload(); // Recarggamos la pagina.
        })
        .catch(function(error){
            console.log(error);
        });
}
function showPost(ArrayList){
    PostApi.ShowPost(token)
        .then(function(data){
            var table = $("#tabla_post");
            data.forEach(post => {
                var tr = document.createElement("tr");
                var tdPost = document.createElement("td");
                var imgStar = document.createElement("img");
                var spanTitle = document.createElement("span");
                var divUser = document.createElement("div");
                var divBody = document.createElement("div");

                spanTitle.textContent = post.title;
                divUser.textContent = "By: "+ ArrayList[post.userId -1].name+" ("+ ArrayList[post.userId -1].email +")";
                divBody.textContent = post.body;

                if(stars.indexOf(post.id - 1) != -1){
                    imgStar.setAttribute("src","file:///C:/Users/ing89/Documents/ITLA/Proyecto/img/favorito_.png");
                }
                else{
                    imgStar.setAttribute("src","file:///C:/Users/ing89/Documents/ITLA/Proyecto/img/favorito.png");
                }
                
                imgStar.setAttribute("id",post.id);
                imgStar.setAttribute("class","star");
                imgStar.setAttribute("onclick","star(this);");

                spanTitle.setAttribute("id", post.id);
                spanTitle.setAttribute("onclick", "btn_4(this);");
                spanTitle.setAttribute("class", "postTitle");
                divBody.setAttribute("class", "postBody");
                
                tdPost.appendChild(imgStar);
                tdPost.appendChild(spanTitle);
                tdPost.appendChild(divUser);
                tdPost.appendChild(divBody);
                
                tdPost.setAttribute("colspan", "2");

                tr.appendChild(tdPost);
                table.append(tr);
            });
        })
        .catch(function(error){
            console.log(error);
        });
}
function btn_4(postId){
    window.localStorage.setItem("postId", postId.getAttribute("id")-1); // Registrar el token en local storage.
    window.location="post.html"; // Redireccionar a post.html
}
function star(post){
    postId = post.getAttribute("id")-1;
    if(post.getAttribute("src") == "file:///C:/Users/ing89/Documents/ITLA/Proyecto/img/favorito.png"){
        
        post.setAttribute("src","file:///C:/Users/ing89/Documents/ITLA/Proyecto/img/favorito_.png");

        stars.push(postId);
        window.localStorage.setItem("Stars", JSON.stringify(stars)); // Registrar el Star en local storage.
    }
    else{
        post.setAttribute("src","file:///C:/Users/ing89/Documents/ITLA/Proyecto/img/favorito.png");
        var sTemp=[];
        for(var i=0 ; i<stars.length ; i++){
            if(stars[i]!=postId){
                sTemp.push(stars[i]);
            }
        }
        stars=sTemp;
        window.localStorage.setItem("Stars", JSON.stringify(stars)); // Actualizar el Star en local storage.
        if(stars.length == 0){
            storage.removeItem("Stars");
        }
    }
}
window.onload = function(){
    $("#btn-3").click(function(){
        logout();
    });
    $("#btn-5").click(function(){
        createPost();
    });
    UserList();
}