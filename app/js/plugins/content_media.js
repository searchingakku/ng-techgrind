(function() {

	var app = angular.module('TechGrindApp.controllers.content.media', []);

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