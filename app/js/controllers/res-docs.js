(function() {

	var appModule = angular.module('TechGrindApp.controllers.res-docs', []);

	appModule.controller('ResourcesDocsCtrl', ['$scope', '$location', 'steam', '$rootScope', '$http', function($scope, loc, steam, $rootScope, $http) {


		var listOfCatFromJson = $http.get('/json/docs_menu.json');
		listOfCatFromJson.success(function(data){
			console.warn('data:',data);
			$rootScope.listOfCategories = data;
		});



	}]);

}).call(this);
