(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', function($scope, $rootScope, $routeParams, $http, $location) {

		var listOfCatFromJson = null;
		// lets find were we are in the app
		var lokky = $location.$$url.split('/')[2];
		
		if(lokky == 'docs'){
			//listOfCatFromJson = $http.get('/json/docs_menu.json');
			listOfCatFromJson = $http.get('http://dev-back1.techgrind.asia/scripts/rest.pike?request=/home/techgrind/resources/docs/tree');
		}else if(lokky == 'guides'){
			//listOfCatFromJson = $http.get('/json/guides_menu.json');
			listOfCatFromJson = $http.get('http://dev-back1.techgrind.asia/scripts/rest.pike?request=/home/techgrind/resources/guides/tree');
		}
		
		listOfCatFromJson.success(function(data){
			console.log('Data for menu...', data.inventory);
			$scope.menuItems = data.inventory;
		});

		$scope.selectedCat = $routeParams.cat;
		$scope.selectedList = $routeParams.list;
		$scope.modifyUrl = function(url){
			return url.replace('/home/techgrind/','/#/');
		};

	}]);
}).call(this);
