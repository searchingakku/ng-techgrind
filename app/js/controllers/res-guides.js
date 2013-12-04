(function() {

	var appModule = angular.module('TechGrindApp.controllers.res-guides', []);

	appModule.controller('ResourcesGuidesCtrl', ['$scope', '$location', 'steam', '$filter', '$rootScope', '$http', 
	function($scope, loc, steam, $filter, $rootScope, $http) {

		// I flag the visibility of the big box.
		$scope.isBoxVisible = true;

		// ---
		// PUBLIC METHODS.
		// ---
		$scope.activateSection = function(id) {
			$scope.activeTitle = $rootScope.listOfCategories[id].title;
			console.log('ACTIVE TITLE: ', $scope.activeTitle);
			$scope.activeId = $rootScope.listOfCategories[id].id;
			$scope.activeDescription = $rootScope.listOfCategories[id].description;
		}


		//First we must obtain the list from steam
		//TODO Steam call to obtain list of categories
		var listOfCatFromJson = $http.get('/json/guides_menu.json');
		listOfCatFromJson.success(function(data){
			console.warn('data:',data);
			$rootScope.listOfCategories = data;
			
			return $scope.activateSection(0);
		});

	}]);

}).call(this);