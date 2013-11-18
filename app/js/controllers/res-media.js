(function() {

	var app = angular.module('TechGrindApp.controllers.resources.media', []);

	// I control the root of the application.
	app.controller("ResourcesMediaCtrl", ['$scope', '$location', 'steam',
	function($scope, loc, steam) {

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
			$scope.photos = buildPhotoSet(listOfCategories[id].id);
		}
		

		// ---
		// PRIVATE METHODS.
		// ---
		function buildPhotoSet(id) {
			var photos = [];
			
			//TODO Steam call to obtain list of media for 1 category
			for (var i = 0; i < listOfContent.length; i++) {
				if (i % 3 == 0){
					photos.push([]);
				}
				photos[photos.length - 1].push({
						id : listOfContent[i].id,
						title : listOfContent[i].title,
						src : listOfContent[i].src,
						type : listOfContent[i].type,
						description : listOfContent[i].description
					});
			}
			return (photos);
		}

		//need to think in where I'm going to catch this id
		return $scope.activateSection(0);

	}]);

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
	var listOfContent = [
		{
		'id' : '0',
		'rootId' : '0',
		'src' : 'http://gogreenplus.org/wp-content/uploads/2011/10/startup1.jpg',
		'type' : 'img',
		'title' : 'Logo',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '1',
		'rootId' : '0',
		'src' : 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
		'type' : 'video',
		'title' : 'Marketing',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '3',
		'rootId' : '1',
		'src' : 'http://gogreenplus.org/wp-content/uploads/2011/10/startup1.jpg',
		'type' : 'img',
		'title' : 'Patern',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '4',
		'rootId' : '1',
		'src' : 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
		'type' : 'video',
		'title' : 'How to...',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		}
	];

}).call(this);
