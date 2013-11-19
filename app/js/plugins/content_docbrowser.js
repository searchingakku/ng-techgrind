(function() {

	var app = angular.module('TechGrindApp.controllers.content.docs', []);

	// I control the root of the application.
	app.controller("ContentDocsCtrl", ['$scope', '$location', 'steam',
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
			$scope.docs = buildPhotoSet(listOfCategories[id].id);
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
		'title':'Seed Round',
		'id':'0',
		'description' : 'Viverra malesuada nunc, orci turpis, interdum vitae felis volutpat'
		},
		{
		'title':'First Round',
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
		'type' : 'pdf',
		'src' : 'http://press.canva.com/wp-content/uploads/2013/03/CanvaPressRelease.pdf',
		'title' : 'Logo',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '1',
		'rootId' : '0',
		'type' : 'doc',
		'src' : 'http://www.cdc.gov/leanworks/downloads/Sample_Budget.doc',
		'title' : 'Marketing',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '3',
		'rootId' : '1',
		'type' : 'pdf',
		'src' : 'http://press.canva.com/wp-content/uploads/2013/03/CanvaPressRelease.pdf',
		'title' : 'Patern',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		},
		{
		'id' : '4',
		'rootId' : '1',
		'type' : 'pdf',
		'src' : 'http://press.canva.com/wp-content/uploads/2013/03/CanvaPressRelease.pdf',
		'title' : 'How to...',
		'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		}
	];

}).call(this);