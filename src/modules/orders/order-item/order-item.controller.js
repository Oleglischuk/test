angular.module('ordersModule')
.controller('orderItemController', function($scope, $rootScope, order){
		// alert('controller started');
	$scope.order = order;

	$rootScope.$on('test:broadcast', function(event, message){
		console.log(message);
	})

	// function getOrder(){
	// 	var id = $routeParams.id;
	// 	ordersService.getOrder(id)
	// 	.then(function(order){
	// 		$scope.order = order;
	// 	})
	// 	.catch(function(err){

	// 	});
	// };
});