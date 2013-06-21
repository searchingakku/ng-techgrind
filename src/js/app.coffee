app = angular.module 'TechGrindApp', [
	'TechGrindApp.filters'
	'TechGrindApp.services'
	'TechGrindApp.directives'
	'TechGrindApp.controllers'
	'ui.bootstrap'
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

	$routeProvider.when 'createactivity',
		templateUrl: 'partials/createactivity.html'
		controller:	'CreateactivityCtrl'

	$routeProvider.otherwise redirectTo: '/home'
]
