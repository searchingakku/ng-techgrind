(function() {

	var app = angular.module('TechGrindApp.controllers.content.media', []);

	// I control the root of the application.
	app.controller("ContentMediaCtrl", ['$scope', '$location', 'steam',
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
			$scope.media = buildPhotoSet(listOfCategories[id].id);
		}
		

		// ---
		// PRIVATE METHODS.
		// ---
		function buildPhotoSet(id) {
			var media = [];
			
			//TODO Steam call to obtain list of media for 1 category
			/*
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
			}*/

			$.each(listOfContent, function(key, value){
				media.push({
						id : value.id,
						title : value.title,
						src : value.src,
						type : value.type,
						description : value.description
					});
			});

			return (media);
		}

		//need to think in where I'm going to catch this id
		return $scope.activateSection(0);

	}]);

	var listOfCategories = [
		{
		'title':'Logos',
		'id':'0',
		'description' : 'All the logos in the world.'
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
		'src' : 'http://blog.heartland.org/wp-content/uploads/2013/07/Google.jpg',
		'type' : 'img',
		'title' : 'Google',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '1',
		'rootId' : '0',
		'src' : 'http://cdn.osxdaily.com/wp-content/uploads/2012/01/apple-logo.gif',
		'type' : 'img',
		'title' : 'Apple',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '3',
		'rootId' : '1',
		'src' : 'http://www.computing.co.uk/IMG/109/255109/ibm-logo--370x229.jpg?1372410530',
		'type' : 'img',
		'title' : 'IBM',
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