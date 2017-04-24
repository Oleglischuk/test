// создание модуля, внимание на пустой масив.
angular.module('app', [
	'ui.router',
	'authorizationModule',
	'ordersModule',
	'profileModule'
	])

angular.module('authorizationModule', [])
angular.module('ordersModule', []);
angular.module('profileModule', []);
angular.module('app')
.config(function($stateProvider, $locationProvider) {
$locationProvider.hashPrefix('');
    $stateProvider
    .state('/', {
        url: '/',
        templateUrl: './main.html',
        controller: 'mainController'
    })
    .state('order', {
        url: '/orders/{id}',
        templateUrl: "./views/orders/order-item/order-item.html",
        controller: 'orderItemController',
        resolve: {
            order: function($stateParams, ordersService){
                console.log($stateParams);
                var id = $stateParams.id;
                return ordersService.getOrder(id);
            }
        }
    })
    .state('order.answers', {
        templateUrl: './views/orders/order-item/answers/answers.html',
        controller: 'answersController'
    })

    // .when("/orders/:id", {
    //     templateUrl : "./views/orders/order-item/order-item.html",
    //     controller: 'orderItemController',
    //     resolve: {
    //         order: function($route, ordersService){
    //             var id = $route.current.params.id;
    //             return ordersService.getOrder(id);
    //         }},

    // })
    //
    //
// ___________________________________________
// $locationProvider.hashPrefix('');
    // $routeProvider
    // .when("/", {
    //     templateUrl: "./main.html",
    //     controller: 'mainController'
    // })
    // .when("/sign-in", {
    //     templateUrl : "./views/authorization/signIn/signIn.html",
    //     controller: 'signInController'
    // })
    // .when("/orders/:id", {
    //     templateUrl : "./views/orders/order-item/order-item.html",
    //     controller: 'orderItemController',
    //     resolve: {
    //         order: function($route, ordersService){
    //             var id = $route.current.params.id;
    //             return ordersService.getOrder(id);
    //         }},

    // })
    // .when("/profile/:id", {
    //     templateUrl : "./views/profile/profile.html",
    //     controller: 'profileController'
    // })
});
angular.module('app')
.constant('config', {
	base: 'http://31.131.22.106',
	prefix: '/api',
	// _____________ROUTES_____________
	login: '/login',
	profile: '/id',
	getOrder: '/order-info/id'

});
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

angular.module('profileModule')
.controller('profileController', function($scope, $routeParams, profileService){
	getUser();
	function getUser(){
		var id = $routeParams.id;
		profileService.getUser(id)
	}
});
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
angular.module('ordersModule')
.controller('answersController', function($scope, $rootScope){
	$scope.runBroadcast = function(){
		alert('clicked');
		$rootScope.$broadcast('test:broadcast', 'Hello world!');
	};
})