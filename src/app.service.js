// если не указан второй параметр - фэктори станет элементом этого модуля.
angular.module('app')
.factory('apiService', ['$http', function($http){
	var todos = [
		{
			name: 'Task1',
			description: 'Description1'
		},
		{
			name: 'Task2',
			description: 'Description2'
		}
	];
	var publicMethods = {
		getTodos: function(){
			return todos;
		},
		createTodo: function(item){
			todos.push(item);
			return todos;
		},
		getUsers: function(){
			return $http.get('https://jsonplaceholder.typicode.com/users')
			.then(function(data){
				return data;
			})
			.catch(function(err){
				alert(err);
			})
		}
	};
	return publicMethods;
}])