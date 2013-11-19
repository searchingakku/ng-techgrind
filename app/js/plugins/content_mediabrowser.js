/*
	content_mediabrowser:
		display-style___________
		this content display plugin acts as a media browser. it should be a fully built-in
			media browser with navigation inside of the media itself (when and if possible).
			the media browser will handle video and photos, which also serve as navigation.
			there are 2 types of elements to display in this plugin.
		
		1) media, which sould include:
		* video / photo thumbnail
		* text-title
		* author
		
		2) category, which should include:
		* photo thumbnail
		* text-title
		
		example #1:
		* <thumbnail>
		* eKita @ SLAP.BKK#2 Pitching!
		* Efraim Pettersson
		
		example #1 - when clicked on, full-scale-view:
		* <thumbnail>
		* eKita @ SLAP.BKK#2 Pitching!
		* Efraim Pettersson
		* July 2, 19:07
		* {FB:10, GP:6, TW:19}
		
		example #2:
		* <techgrind-logo>
		* TechGrind
		
		example #2.2: (a sub-category)
		* <thumbnail>
		* TechGrind.Events
		
		functional goal___________
		this plugin should display media in a media browser as thumbnails.
			when clicking on a thumbnail, 1 of 2 things happens:
			1) if thumbnail is a category, media browser navigates to the category, adding a "breadcrumb" to a navigation element
			2) if thumbnail is an image/video, media browser expands view to full-scale for the specified media object
			
		example-media -> displayed information ==> action-on-interaction:
			photo/video/image -> thumbnail-view ==> full-scale view
*/

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