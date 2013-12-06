(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', function($scope, $rootScope, $routeParams, $http, $location) {

		var listOfCatFromJson = null;
		if($location.$$url.split('/')[2] == 'docs'){
			listOfCatFromJson = $http.get('/json/docs_menu.json');
		}else{
			listOfCatFromJson = $http.get('/json/guides_menu.json');
		}
		
		listOfCatFromJson.success(function(data){
			$scope.groups = data;
		});

		$scope.selectedCat = $routeParams.cat;
		$scope.selectedList = $routeParams.list;

	}]);
}).call(this);
