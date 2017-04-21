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