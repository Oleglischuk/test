angular.module('ordersModule')
.factory('ordersService', ['$http', 'config', function($http, config){
	var publicMethods = {
		getOrder: function(id){
			return $http.get(config.base + config.prefix + config.getOrder + id).then(function(response){
				return response.data;
			})
			.catch(function(err){
				console.log(err);
			})
		}
	};
	return publicMethods;
}])