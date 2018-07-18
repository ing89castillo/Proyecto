var SecurityApi = (function(){
    var baseUrl = "http://localhost:8080";
    var PATH_LOGIN = "/login";
    var PATH_LOGUP = "/register";
    var PATH_LOGOUT = "/logout";
    return {
        url: function(){
            return baseUrl;
        },
        login: function(email, password){
            return new Promise(function(resolve, reject){
                var ld = {
                    email: email,
                    password: password
                }
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_LOGIN,
                    success: function (data){
                        resolve(data);
                    },
                    error: function(error){
                        reject(error);
                    }
                });
            });
        },
        logup: function(name, email, password){
            return new Promise(function(resolve, reject){
                var ld = {
                    name: name,
                    email: email,
                    password: password
                }
                $.ajax({
                    method: 'POST',
                    data: JSON.stringify(ld),
                    url: baseUrl + PATH_LOGUP,
                    success: function (){
                        resolve();
                    },
                    error: function(error){
                        reject(error);
                    }
                });
            });
        },
        logout: function(token){
            return new Promise(function(resolve, reject){
                
                $.ajax({
                    method: 'DELETE',
                    url: baseUrl + PATH_LOGOUT,
                    headers: {'Authorization' : 'Bearer ' + token},
                    success: function(){
                        resolve();
                    },
                    error: function(error){
                        reject(error);
                    }
                });

            });
        }
    }
})();