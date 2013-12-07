(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'localStorageService',
	function($scope, $rootScope, $routeParams, $http, $location, localStorageService) {

		var listOfCatFromJson = null;
		// lets find were we are in the app
		var lokky = $location.$$url.split('/')[2];
		
		//lets verify we havent save the information into localstorage
		var menuSaved = localStorageService.get(lokky+'Menu');
		if(!!!menuSaved){
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
				localStorageService.add(lokky+'Menu', JSON.stringify(data.inventory));
			});
		}else{
			$scope.menuItems = JSON.parse(menuSaved);
		}
		//lets try a trick to place back the transition on open and close
//		$.each($('#menu_accordion').find('.collapse'), function(key, value){
//			$(value).css({transition:"height .35s ease"});
//		});
		

		$scope.selectedCat = $routeParams.cat;
		$scope.selectedList = $routeParams.list;
		$scope.modifyUrl = function(url){
			return url.replace('/home/techgrind/','/#/');
		};
		$scope.goto = function(url){
			console.log('clicking');
			window.location.href = url.replace('/home/techgrind/','/#/');
			//$location.path(url.replace('/home/techgrind/','/#/'));
		};

	}]);
}).call(this);
