var url = function (){
    return SecurityApi.url();
}
var UserApi = (function(){
    var baseUrl = url();
    var PATH_USER = "/users";
    return {
        Users: function(token){
            return new Promise(function(resolve, reject){
                $.ajax({
                    method: 'GET',
                    url: baseUrl + PATH_USER,
                    headers: {'Authorization' : 'Bearer ' + token},
                    success: function(data){
                        resolve(data);
                    },
                    error: function(error){
                        reject(error);
                    }
                });
            });
        }
    }
})();