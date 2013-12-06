(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {

		$scope.groups = $rootScope.listOfCategories;
		
		$scope.selectedCat = $routeParams.cat;
		$scope.selectedList = $routeParams.list;
		
	}]);
}).call(this);
