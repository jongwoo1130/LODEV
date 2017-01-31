var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    var refresh = function(){
	    $http({
	    	method: 'GET',
	    	url: '/itemList'
	    }).then(function(response){
	    	console.log(response.data[0].name);
	    	$scope.itemList = response.data;
	    })  
	};

    $scope.addData = function(){
    	$http({
    		method: 'POST',
    		url: 'itemList',
    		data: $scope.input
    	}).then(function(response){
    		$scope.input =""; //Clear input box
    		refresh();
    	})
	};
}]);