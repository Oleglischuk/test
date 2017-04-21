angular.module('profileModule')
.controller('profileController', function($scope, $routeParams, profileService){
	getUser();
	function getUser(){
		var id = $routeParams.id;
		profileService.getUser(id)
	}
});