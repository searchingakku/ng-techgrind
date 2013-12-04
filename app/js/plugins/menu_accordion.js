(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

		$scope.groups = $rootScope.listOfCategories;
		
		
	}]);
}).call(this);
