angular.module('authorizationModule')
.factory('authorizationService', ['$http', 'config', function($http, config){
	var publicMethods = {
		login: function(data){
			return $http.post(config.base + config.prefix + config.login, data).then(function(response){
				return response.data;
			})
			.catch(function(err){
				console.log(err);
			})
		}
	};
	return publicMethods;
}])