(function() {

	var appModule = angular.module('TechGrindApp.controllers.res-guides', []);

	appModule.controller('ResourcesGuidesCtrl', ['$scope', '$location', 'steam', '$filter',
	function($scope, loc, steam, $filter) {

		// I flag the visibility of the big box.
		$scope.isBoxVisible = true;

		// ---
		// PUBLIC METHODS.
		// ---
		$scope.activateSection = function(id){
			//First we must obtain the list from steam
			//TODO Steam call to obtain list of categories
			$scope.activeTitle = listOfCategories[id].title;
			console.log('ACTIVE TITLE: ',$scope.activeTitle);
			$scope.activeId =listOfCategories[id].id;
			$scope.activeDescription =listOfCategories[id].description;
		}

		//need to think in where I'm going to catch this id
		return $scope.activateSection(0);
	}]);

}).call(this);
