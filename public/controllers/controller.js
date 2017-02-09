var myApp = angular.module('myApp', ['angular-skycons']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
	$scope.active = true;
    var refresh = function(){
	    $http({
	    	method: 'GET',
	    	url: '/itemList'
	    }).then(function(response){
	    	$scope.itemList = response.data;
	    });
	};

	refresh();

    $scope.addData = function(){
    	$http({
    		method: 'POST',
    		url: 'itemList',
    		data: $scope.input
    	}).then(function(response){
			if(response.data === 'duplicate'){
				$scope.duplicate = "Data already exists!";
			}else{
    			$scope.input.username = ""; //Clear input box
    			$scope.input.data = ""; //Clear input box
				$scope.input.location = "";
				$scope.duplicate = "";
				refresh();
			}
    	}).catch(function (error) {
			if(error.status == 403){
				$scope.duplicate = "Data already exists!";
			}
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http({
			method: 'DELETE',
			url: 'itemList/' + id,
		}).then(function(response){
			refresh();
		});
	};
}]);