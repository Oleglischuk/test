angular.module('ordersModule')
.controller('answersController', function($scope, $rootScope){
	$scope.runBroadcast = function(){
		alert('clicked');
		$rootScope.$broadcast('test:broadcast', 'Hello world!');
	};
})