angular.module('app')
.controller('mainController', ['$scope', 'apiService', function($scope, apiService){
	$scope.todos = apiService.getTodos();

	// _________________
	$scope.newTodo = {
		name: '',
		description:''
	};


	$scope.createTodo = function(){
		apiService.createTodo($scope.newTodo);
		$scope.newTodo = {
			name: '',
			description:''
		};
	};
	$scope.finishTodo = function(todo){
		todo.status = 'finished';
	};
	$scope.removeTodo = function(todo){
		var index = $scope.todos.indexOf(todo);
		$scope.todos.splice(index, 1);
		console.log(index);
	}
	$scope.alertHello = function(){
		// alert('hello');
	};
	$scope.getUsers = function(){
		apiService.getUsers().then(function(data){
			console.log(data);
		});
	}

	// _________________
}]);
