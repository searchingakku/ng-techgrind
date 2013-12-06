###
# 
# 	File: <name>
# 		Define file purpose: "What does this file do??? Why does it exist???"
# 
# 	Class: <name>
# 		Is this a class/object? Define its purpose: its "persona" or "role"
# 		Define its structure: what data elements, methods, etc does it need?
# 
# 	Function: <name>
# 		Is this a function? Define its purpose.
# 		Here's an example, lets say its a multiply function...
# 		Parameters/Inputs:
# 			x - The first integer.
# 		 	y - The second integer.
# 		Returns/Outputs:
# 		 	The two integers multiplied together.
# 		Example/Usage:
# 			var x = <functionName>(a,b);
# 			input.print tostring(x);
# 		 
# 	See Also:
#  		links? another file? function? webpage tutorial?
# 		anything else that can help me understand this file overall? 
# 
###

# http://docs.angularjs.org/guide/module
# http://docs.angularjs.org/api/angular.module
app = angular.module 'TechGrindApp', [
	'TechGrindApp.filters'
	'TechGrindApp.services'
	'TechGrindApp.directives'
	'TechGrindApp.directives.lazy-loading-img'
	'TechGrindApp.directives.ui.tinymce'
	'TechGrindApp.controllers'
	'TechGrindApp.controllers.regions'
	'TechGrindApp.controllers.events'
	'TechGrindApp.controllers.res-jobs'
	'TechGrindApp.controllers.res-docs'
	'TechGrindApp.controllers.res-guides'
	'TechGrindApp.controllers.res-media'
	'TechGrindApp.controllers.res-teamspeak'
	'TechGrindApp.controllers.partners'
	'TechGrindApp.controllers.content.articles'
	'TechGrindApp.controllers.content.docbrowser'
	'TechGrindApp.controllers.content.mediabrowser'
	'TechGrindApp.controllers.list.tableview'
	'TechGrindApp.controllers.list.entities'
	'TechGrindApp.controllers.list.places'
	'TechGrindApp.controllers.info.userprofile'
	'TechGrindApp.plugins.menu.accordion'
	'ui.bootstrap'
	'ngRoute'
	'ngGrid'
	'LocalStorageModule'
	'ContentFullPageModal'
	'ToolsRichEditor'
]

# give usage example for setting up a route, explain where each of these components goes and what it does
# eg: how do i make a route for a dynamic link? what does :name do in a link or path?
app.config ['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->


# GENERAL FUNCTION PAGES
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

	$routeProvider.when '/people',
		templateUrl: 'partials/plugins/info_userprofile.html'
		controller: 'InfoUserProfileCtrl'

	$routeProvider.when '/people/:userid',
		templateUrl: 'partials/plugins/info_userprofile.html'
		controller: 'InfoUserProfileCtrl'

# MAIN MENU PAGES
	$routeProvider.when '/home',
		templateUrl: 'partials/home.html'
		controller: 'HomeCtrl'

	$routeProvider.when '/regions',
		templateUrl: 'partials/regions.html'
		controller: 'RegionsCtrl'

	$routeProvider.when '/events',
		templateUrl: 'partials/events.html'
		controller: 'EventsCtrl'

	$routeProvider.when '/resources/jobs',
		templateUrl: 'partials/res-jobs.html'
		controller: 'ResourcesJobsCtrl'
		
	$routeProvider.when '/resources/docs/:cat/:list',
		templateUrl: 'partials/res-docs.html'
		controller: 'ResourcesDocsCtrl'
		
	$routeProvider.when '/resources/guides/:cat/:list',
		templateUrl: 'partials/res-guides.html'
		controller: 'ResourcesGuidesCtrl'
		
	$routeProvider.when '/resources/media',
		templateUrl: 'partials/res-media.html'
		controller: 'ResourcesMediaCtrl'

	$routeProvider.when '/resources/teamspeak',
		templateUrl: 'partials/res-teamspeak.html'
		controller: 'ResourcesTeamSpeakCtrl'

	$routeProvider.when '/partners',
		templateUrl: 'partials/partners.html'
		controller: 'PartnersCtrl'

# API CALL PAGES
	$routeProvider.when '/regions/:region',
		templateUrl: 'partials/regions.html'
		controller: 'RegionsCtrl'

	$routeProvider.when '/events/new',
		templateUrl: 'partials/createactivity.html'
		controller: 'CreateactivityCtrl'

	$routeProvider.when '/events/:name',
		templateUrl: 'partials/createactivity.html'
		controller: 'CreateactivityCtrl'

	$routeProvider.when '/article/:id',
		templateUrl: 'partials/article.html'
		controller: 'ArticleCtrl'

	$routeProvider.when '/test-cleanup',
		templateUrl: 'partials/home.html'
		controller: 'TestCtrl'
		
	$routeProvider.when '/sgenome',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/sgenome/:country',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/sgenome/:country/:filter',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

# PLUGINS AND SERVICES PAGES
	$routeProvider.when '/lists',
		templateUrl: 'partials/plugins/lists.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/lists/:country',
		templateUrl: 'partials/plugins/list_:country.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/lists/:country/:filter',
		templateUrl: 'partials/plugins/list_:filter.html'
		controller: 'StartupGenomeCtrl'		

# WIP: incomplete
	$routeProvider.when '/content',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentCtrl'

	$routeProvider.otherwise redirectTo: '/home'
]