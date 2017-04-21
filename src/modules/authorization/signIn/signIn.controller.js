angular.module('authorizationModule')
.controller('signInController', function($scope, authorizationService, $rootScope){
	$scope.signInModel = {
		email: '',
		password: ''
	};
	$scope.login = function(){
		authorizationService.login($scope.signInModel)
		.then(function(user){
			$rootScope.logged = user;
		})
	};
});