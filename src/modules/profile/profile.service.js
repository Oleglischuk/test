angular.module('profileModule')
    .factory('profileService', ['$http', 'config', function($http, config) {
        var publicMethods = {
            getUser: function(id) {
                return $http.get(config.base + config.prefix + config.profile + id)
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        };
        return publicMethods;
    }])