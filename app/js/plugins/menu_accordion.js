(function() {

	var appModule = angular.module('TechGrindApp.plugins.menu.accordion', []);

	appModule.controller('MenuAccordionCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location', 'localStorageService',
	function($scope, $rootScope, $routeParams, $http, $location, localStorageService) {

		var listOfCatFromJson = null;
		// lets find were we are in the app
		var lokky = $location.$$url.split('/')[2];
		//var lokky = sharedData;
		
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

//		$scope.isopen = false;
		$scope.modifyUrl = function(id){
			$scope.selectedList = id;
//			console.log('$scope.selectedCat: ',$scope.selectedCat);
//			console.log('$scope.selectedList: ',$scope.selectedList);
		};
		$scope.selectCat = function(item){
			if(item.oid != $scope.selectedCat && !item.open){
				$scope.selectedCat = item.oid;
				$.each($scope.menuItems, function(k,v){
					v.open = false;
				});
				item.open = true;
			} else if(item.oid == $scope.selectedCat && !item.open){
				item.open = true;
			} else {
				item.open = false;
			}
			console.log('$scope.selectedCat: ',$scope.selectedCat);
			console.log('$scope.selectedList: ',$scope.selectedList);
		};

	}]);
}).call(this);
