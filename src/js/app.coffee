app = angular.module 'TechGrindApp', [
	'TechGrindApp.filters'
	'TechGrindApp.services'
	'TechGrindApp.directives'
	'TechGrindApp.controllers'
	'ui.bootstrap'
	'LocalStorageModule'
]

app.config ['$routeProvider', ($routeProvider) ->
	$routeProvider.when '/home',
		templateUrl: 'partials/home.html'
		controller: 'HomeCtrl'
		
	$routeProvider.when '/regions',
		templateUrl: 'partials/regions.html'
		controller: 'RegionsCtrl'

	$routeProvider.when '/calendar',
		templateUrl: 'partials/calendar.html'
		controller: 'CalendarCtrl'

	$routeProvider.when '/events',
		templateUrl: 'partials/events.html'
		controller: 'EventsCtrl'

	$routeProvider.when '/events/new',
		templateUrl: 'partials/createactivity.html'
		controller: 'CreateactivityCtrl'

	$routeProvider.when '/events/:name',
		templateUrl: 'partials/createactivity.html'
		controller: 'CreateactivityCtrl'

	$routeProvider.when '/resources',
		templateUrl: 'partials/resources.html'
		controller: 'ResourcesCtrl'

	$routeProvider.when '/media',
		templateUrl: 'partials/media.html'
		controller: 'MediaCtrl'

	$routeProvider.when '/partners',
		templateUrl: 'partials/partners.html'
		controller: 'PartnersCtrl'
	
	$routeProvider.when '/register',
		templateUrl: 'partials/register.html'
		controller: 'RegisterCtrl'
	
	$routeProvider.when '/login',
		templateUrl: 'partials/login.html'
		controller: 'LoginCtrl'

	$routeProvider.when '/activate/:userid/:activationcode',
		templateUrl: 'partials/activation.html'
		controller: 'ActivationCtrl'

	$routeProvider.when '/content/',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content/:type',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content-page',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'

	$routeProvider.when ':userid/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content:userid/:tab/:articlename/:tags',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when ':userid/article/:articlename',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'

	$routeProvider.when '/:country/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/:country/articles/:tags',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/regions/:region/',
		templateUrl: 'partials/region-content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/:tab/:articlename',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentCtrl'

	$routeProvider.when 'content-page/:title',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'

	$routeProvider.when '/test-cleanup',
		templateUrl: 'partials/home.html'
		controller: 'TestCtrl'

	$routeProvider.otherwise redirectTo: '/home'
]
