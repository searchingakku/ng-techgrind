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
	
	$routeProvider.when '/resources/jobs',
		templateUrl: 'partials/res-jobs.html'
		controller: 'ResourcesCtrl'
		
	$routeProvider.when '/resources/docs',
		templateUrl: 'partials/res-docs.html'
		controller: 'ResourcesCtrl'
		
	$routeProvider.when '/resources/tutorials',
		templateUrl: 'partials/res-tutorials.html'
		controller: 'ResourcesCtrl'
		
	$routeProvider.when '/resources/teamspeak',
		templateUrl: 'partials/res-teamspeak.html'
		controller: 'ResourcesCtrl'

	$routeProvider.when '/resources/media',
		templateUrl: 'partials/res-media.html'
		controller: 'ResourcesCtrl'

	$routeProvider.when '/partners',
		templateUrl: 'partials/partners.html'
		controller: 'PartnersCtrl'
	
	$routeProvider.when '/register',
		templateUrl: 'partials/register.html'
		controller: 'RegisterCtrl'
	
	$routeProvider.when '/login',
		templateUrl: 'partials/login.html'
		controller: 'LoginCtrl'

	$routeProvider.when '/login/:userid',
		templateUrl: 'partials/login.html'
		controller: 'LoginCtrl'

	$routeProvider.when '/activate/:userid/:activationcode',
		templateUrl: 'partials/activation.html'
		controller: 'ActivationCtrl'



	$routeProvider.when '/test-cleanup',
		templateUrl: 'partials/home.html'
		controller: 'TestCtrl'
		
	$routeProvider.when '/sgenome',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.otherwise redirectTo: '/home'
]
