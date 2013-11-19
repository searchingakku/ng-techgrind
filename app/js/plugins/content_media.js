(function() {

	var app = angular.module('TechGrindApp.controllers.content.media', []);

	// I control the root of the application.
	app.controller("ContentMediaCtrl", ['$scope', '$location', 'steam',
	function($scope, loc, steam) {

		$scope.medias = listOfContent;

		Galleria.loadTheme('lib/galleria/themes/classic/galleria.classic.min.js');
		Galleria.run('[ng-controller="ContentMediaCtrl"] .galleria');

	}]);

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
		}
		// ,{
		// 'id' : '4',
		// 'rootId' : '1',
		// 'src' : 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
		// 'type' : 'video',
		// 'title' : 'How to...',
		// 'description' : 'Cras orci turpis, interdum vitae felis volutpat, viverra malesuada nunc. Fusce magna dolor, '
		// }
	];

}).call(this);