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

	var app = angular.module('TechGrindApp.controllers.content.mediabrowser', []);

	// I control the root of the application.
	app.controller("ContentMediaCtrl", ['$scope', '$location', 'steam',
	function($scope, loc, steam) {

		Galleria.loadTheme('lib/galleria/themes/classic/galleria.classic.min.js');
		Galleria.configure({
			transition : 'fadeslide',
			imageCrop : true,
			clicknext : true
		}); 
		Galleria.run('[ng-controller="ContentMediaCtrl"] .galleria', { dataSource: listOfContent });

	}]);

	var listOfContent = [{
		thumb : 'http://www.staff.com/blog/wp-content/uploads/2013/01/Staff-infograph_billion-dollar-startups-a.png',
		image : 'http://www.staff.com/blog/wp-content/uploads/2013/01/Staff-infograph_billion-dollar-startups-a.png',
		title : 'My title',
		description : 'My description',
	}, {
		video : 'http://www.youtube.com/watch?v=GCZrz8siv4Q',
		title : 'My second title',
		description : 'My second description'
	}, {
		thumb : 'http://omoii.com/wp/wp-content/uploads/2012/12/startups.jpg',
		image : 'http://omoii.com/wp/wp-content/uploads/2012/12/startups.jpg',
		title : 'My title',
		description : 'My description',
	}, {
		thumb : 'http://www.briefmine.com/blog/wp-content/uploads/2013/04/startups-image.jpg',
		image : 'http://www.briefmine.com/blog/wp-content/uploads/2013/04/startups-image.jpg',
	}, {
		thumb : 'http://siliconflorist.com/wp-content/uploads/2011/05/meet-the-startup.png',
		image : 'http://siliconflorist.com/wp-content/uploads/2011/05/meet-the-startup.png',
	}, {
		thumb : 'http://brazilianbubble.com/wp-content/uploads/2012/02/startups5.jpg',
		image : 'http://brazilianbubble.com/wp-content/uploads/2012/02/startups5.jpg',
	}, {
		thumb : 'http://timoelliott.com/blog/wp-content/uploads/2012/09/SAP-and-Startups.jpg',
		image : 'http://timoelliott.com/blog/wp-content/uploads/2012/09/SAP-and-Startups.jpg',
	}
	];

}).call(this);