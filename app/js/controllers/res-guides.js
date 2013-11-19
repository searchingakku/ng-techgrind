(function() {

	var appModule = angular.module('TechGrindApp.controllers.res-guides', []);

	appModule.controller('ResourcesGuidesCtrl', ['$scope', '$location', 'steam', '$filter',
	function($scope, loc, steam, $filter) {

		// I flag the visibility of the big box.
		$scope.isBoxVisible = true;

		$scope.categories = listOfCategories;

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


	var listOfCategories = [
		{
		'title':'Architectural patterns',
		'id':'0',
		'description' : 'An architectural pattern is a standard design in the field of software architecture. The concept of an architectural pattern has a broader scope than the concept of design pattern. The architectural patterns address various issues in software engineering, such as computer hardware performance limitations, high availability and minimization of a business risk. Some architectural patterns have been implemented within software frameworks.'
		},
		{
		'title':'Seed Round',
		'id':'1',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'title':'Investors',
		'id':'2',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'title':'Plans',
		'id':'3',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'title':'Budget',
		'id':'4',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'title':'Offices',
		'id':'5',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'title':'Hiring',
		'id':'6',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
	];