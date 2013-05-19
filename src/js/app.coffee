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

	$routeProvider.otherwise redirectTo: '/home'
]
