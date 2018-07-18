var storage = window.localStorage;
var token = storage.getItem("Token");
var postId = storage.getItem("postId");
function logout(){
    SecurityApi.logout(token)
        .then(function(response){
            storage.removeItem("Token"); // Eliminar el Token, del Storage.
            storage.removeItem("postId"); // Eliminar el postId, del Storage.
            window.location="login.html"; // Re-direccional a la página de inicio.
        })
        .catch(function(error){
            console.log("Error: ", error);
        });
}
function backPosts(){
    storage.removeItem("postId"); // Eliminar el postId, del Storage.
    window.location="index.html"; // Re-direccional a la página de inicio.
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
function createComment(){
    var body = document.getElementById("CommentingPost").value;
    PostApi.CreateComment(postId, body, token)
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
            
            var tr = document.createElement("tr");
            var tdPost = document.createElement("td");
            var divTitle = document.createElement("div");
            var divUser = document.createElement("div");
            var divBody = document.createElement("div");

            divTitle.textContent = data[postId].title;
            divUser.textContent = "By: "+ ArrayList[data[postId].userId -1].name+" ("+ ArrayList[data[postId].userId -1].email +")";
            divBody.textContent = data[postId].body;

            divTitle.setAttribute("class", "postTitle");
            divBody.setAttribute("class", "postBody");

            tdPost.appendChild(divTitle);
            tdPost.appendChild(divUser);
            tdPost.appendChild(divBody);

            tdPost.setAttribute("colspan", "2");

            tr.appendChild(tdPost);
            table.append(tr);

            showComment(ArrayList);
        })
        .catch(function(error){
            console.log(error);
        });
}
function showComment(ArrayList){
    PostApi.ShowComment(postId, token)
        .then(function(data){
            var table = $("#tabla_post");
            data.forEach(post => {
                var tr = document.createElement("tr");
                var tdPost = document.createElement("td");
                var divBody = document.createElement("div");
                 var divUser = document.createElement("div");

                
                divBody.textContent = post.body;
                divUser.textContent = ArrayList[post.userId -1].name+" ("+ ArrayList[post.userId -1].email +")";

                divBody.setAttribute("class", "CommentBody");
                divUser.setAttribute("class", "CommentUser");
                
                tdPost.appendChild(divBody);
                tdPost.appendChild(divUser);
                
                tdPost.setAttribute("colspan", "2");

                tr.appendChild(tdPost);
                table.append(tr);
            });
        })
        .catch(function(error){
            console.log(error);
        });
}

window.onload = function(){
    $("#btn-3").click(function(){
        logout();
    });
    $("#btn-4").click(function(){
        backPosts();
    });
    $("#btn-5").click(function(){
        createComment();
    });
    UserList();
}