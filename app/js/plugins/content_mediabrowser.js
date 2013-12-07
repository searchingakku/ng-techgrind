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
	app.controller("ContentMediaCtrl", ['$scope', '$location', 'steam', '$routeParams',
	function($scope, loc, steam, $routeParams) {
		
		if(!!$routeParams.cat){
			$scope.level = 1;
			$scope.listOfMedia = shuffle(mockListOfMedia);
		} else {
			$scope.level = 0;
		}
		
		$scope.categories = listOfCat;

		$scope.goToSubLevel = function(path){
			window.location.href = path.replace('/home/techgrind/','/#/');
		};


//		$scope.myInterval = 5000;
//		$scope.slides = [];
//		$scope.goToGallery = function(index){
//
//			$.each($scope.listOfMedia, function(key, value){
//				var newWidth = 200 + (($scope.slides.length + (25 * $scope.slides.length)) % 150);
//				$scope.slides.push({
//					thumb : value.image,
//					title : value.title,
//					active : (key == index)
//				});
//				
//			});
//			
//			//Lets move into level 2
//			$scope.level = 2;
//		};

	}]);
	
	
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array.slice(1,9);;
	}
	

	var listOfCat = [{
		thumb : 'http://gainesvillebizreport.com/wp-content/themes/AllNews/timthumb.php?src=http://gainesvillebizreport.com/wp-content/uploads/2013/07/IMG_2268.jpg&h=140&w=240&zc=1&q=100',
		image : 'http://gainesvillebizreport.com/wp-content/themes/AllNews/timthumb.php?src=http://gainesvillebizreport.com/wp-content/uploads/2013/07/IMG_2268.jpg&h=140&w=240&zc=1&q=100',
		title : 'StartUps',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/startups"
	}, {
		thumb : 'http://www.trianglecoalition.org/wp-content/uploads/2011/05/CONFERENCE-ILLUSTRATION-2.jpg',
		image : 'http://www.trianglecoalition.org/wp-content/uploads/2011/05/CONFERENCE-ILLUSTRATION-2.jpg',
		title : 'Ideas',
		description : 'My second description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/ideas"
	}, {
		thumb : 'http://t1.gstatic.com/images?q=tbn:ANd9GcTqD0NbMSeAtiPWgWDsZw-GiwPQcHw-5I-oUPHOLUNQxSSLTwZyYw',
		image : 'http://us.123rf.com/400wm/400/400/dwphotos/dwphotos1107/dwphotos110700001/9954493-concert-crowd.jpg',
		title : 'Morning',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/morning"
	}, {
		thumb : 'http://selleo.com/blog/wp-content/uploads/2013/03/04-zed.jpg',
		image : 'http://selleo.com/blog/wp-content/uploads/2013/03/04-zed.jpg',
		title : 'Seed Round',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/seedround"
	}, {
		thumb : 'http://www.cfel.jbs.cam.ac.uk/news/news/images/tim_robin_flittercab.jpg',
		image : 'http://www.cfel.jbs.cam.ac.uk/news/news/images/tim_robin_flittercab.jpg',
		title : 'Myitle',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/myitle"
	}, {
		thumb : 'http://farm9.staticflickr.com/8043/8135076781_383dbe6e7f_m.jpg',
		image : 'http://farm9.staticflickr.com/8043/8135076781_383dbe6e7f_m.jpg',
		title : 'My',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/my"
	}, {
		thumb : 'http://i.telegraph.co.uk/multimedia/archive/02492/mwc-board_2492220k.jpg',
		image : 'http://i.telegraph.co.uk/multimedia/archive/02492/mwc-board_2492220k.jpg',
		title : 'Lol',
		description : 'My description',
		author : 'Narp Dev',
		path: "/home/techgrind/resources/media/lol"
	}
	];
	
	var mockListOfMedia = [{
		thumb : 'http://ktrmurali.files.wordpress.com/2011/08/1289508149-bali-mrc-comp-05wm-1000x666.jpg',
		image : 'http://ktrmurali.files.wordpress.com/2011/08/1289508149-bali-mrc-comp-05wm-1000x666.jpg',
		title : 'StartUps',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://ellenblanc.files.wordpress.com/2007/11/bali-temple.jpg',
		image : 'http://ellenblanc.files.wordpress.com/2007/11/bali-temple.jpg',
		title : 'Ideas',
		description : 'My second description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://omoii.com/wp/wp-content/uploads/2012/12/startups.jpg',
		image : 'http://omoii.com/wp/wp-content/uploads/2012/12/startups.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://www.gsmnation.com/blog/wp-content/uploads/2013/02/hottest-phones-of-mwc-2013-0.jpg',
		image : 'http://www.gsmnation.com/blog/wp-content/uploads/2013/02/hottest-phones-of-mwc-2013-0.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t2.gstatic.com/images?q=tbn:ANd9GcRuUjzNSGkHrqsiPlRhrkeOm2EZfL1zcwRaKmGGzefxJcF2t8y5IA',
		image : 'http://charlestoninsideout.net/wp-content/uploads/2009/03/img_2277.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t3.gstatic.com/images?q=tbn:ANd9GcSYIYhaqwQE_rID7G0OvP88uyy8F4gm1u-EyOp_P3CNn7gfFs5jyA',
		image : 'http://3.bp.blogspot.com/-qkuEpFdaSBg/T6fe5BVOf4I/AAAAAAAACgU/vXC9n3kDQb8/s1600/TANDBERG_Total_Solution_Diagram.png',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://i1.trekearth.com/photos/3116/bali-temple-web.jpg',
		image : 'http://i1.trekearth.com/photos/3116/bali-temple-web.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t3.gstatic.com/images?q=tbn:ANd9GcTnpnC7I6v5-zKmUs3K_IPIllO1nBDAknAXA22frUvi1OpJ4nq4',
		image : 'http://t3.gstatic.com/images?q=tbn:ANd9GcTnpnC7I6v5-zKmUs3K_IPIllO1nBDAknAXA22frUvi1OpJ4nq4',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t3.gstatic.com/images?q=tbn:ANd9GcScameuk48uV1av508JjZcGH_Qhv34RnWeozXyeeYTjg32BucjyoQ',
		image : 'http://themaisonette.net/wp-content/uploads/2012/09/Architecture-design-modern-architecture-design-rg-home-design.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsfExF8iTdUj0eq0jC1cS_J-VD24dKtGlGTvSJSnq7TMf_lshexw',
		image : 'http://us.123rf.com/400wm/400/400/akulamatiau/akulamatiau1202/akulamatiau120200170/12370507-modern-building-architecture-design-and-details-lausanne-switzerland.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRTMFJeHDlVWgIbzK4-34jcaLl1H5JZVvtsC7gmU-34nMAer1GWzg',
		image : 'http://upload.wikimedia.org/wikipedia/commons/6/6d/Old_City_Viewed_from_City_Walls_-_Dubrovnik_-_Croatia_03.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t1.gstatic.com/images?q=tbn:ANd9GcRih0hGXc1vLCak_9xUUdTEi2axtvBotrv_Qw_E7hQcuJmUcu24',
		image : 'http://images.wikia.com/galaxysaga/images/0/07/Future-city.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://t1.gstatic.com/images?q=tbn:ANd9GcRkiyEZBPqDWKK_UM-BporEu1Yel1dsKejrv2vh76v-simQLgqH0g',
		image : 'http://greencitiesbuilders.webs.com/photos/future-green-cities/doha-quatar-mead.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://media02.hongkiat.com/cities-of-the-futures/futurecitytoorobertdbrown.jpg',
		image : 'http://media02.hongkiat.com/cities-of-the-futures/futurecitytoorobertdbrown.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}, {
		thumb : 'http://th00.deviantart.net/fs70/PRE/f/2012/254/2/7/future_city_10_09_2012_by_docberlin77-d5ecg4q.jpg',
		image : 'http://th00.deviantart.net/fs70/PRE/f/2012/254/2/7/future_city_10_09_2012_by_docberlin77-d5ecg4q.jpg',
		title : 'My title',
		description : 'My description',
		author : 'Narp Dev'
	}
	];

}).call(this);