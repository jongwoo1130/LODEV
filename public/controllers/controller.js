var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    $http({
    	method: 'GET',
    	url: '/itemList'
    }).then(function(response){
    	console.log(response.data[0].name);
    	$scope.itemList = response.data;
    })  
}]);