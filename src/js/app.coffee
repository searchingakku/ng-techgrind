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
	'TechGrindApp.controllers.content.articles.fullpage'
	'TechGrindApp.controllers.content.docbrowser'
	'TechGrindApp.controllers.content.mediabrowser'
	'TechGrindApp.controllers.list.tableview'
	'TechGrindApp.controllers.list.entities'
	'TechGrindApp.controllers.info.userprofile'
	'TechGrindApp.controllers.info.startupprofile'
	'TechGrindApp.controllers.info.event'
	'TechGrindApp.plugins.menu.accordion'
	'TechGrindApp.plugins.widget.filterbox'
	'ui.bootstrap'
	'ngRoute'
	'ngGrid'
	'LocalStorageModule'
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

	$routeProvider.when '/resources/docs',
		templateUrl: 'partials/res-docs.html'
		controller: 'ResourcesDocsCtrl'

	$routeProvider.when '/resources/guides',
		templateUrl: 'partials/res-guides.html'
		controller: 'ResourcesGuidesCtrl'

	$routeProvider.when '/resources/media',
		templateUrl: 'partials/res-media.html'
		controller: 'ResourcesMediaCtrl'

  $routeProvider.when '/resources/media/:cat',
    templateUrl: 'partials/res-media.html'
    controller: 'ResourcesMediaCtrl'

	$routeProvider.when '/resources/teamspeak',
		templateUrl: 'partials/res-teamspeak.html'
		controller: 'ResourcesTeamSpeakCtrl'

	$routeProvider.when '/partners',
		templateUrl: 'partials/partners.html'
		controller: 'PartnersCtrl'

## REGIONS
	$routeProvider.when '/regions/:region',
		templateUrl: 'partials/regions.html'
		controller: 'RegionsCtrl'

## EVENTS
	$routeProvider.when '/events/new',
		templateUrl: 'partials/plugins/info_event.html'
		controller: 'InfoEventCreateNewCtrl'

	$routeProvider.when '/events/:name',
		templateUrl: 'partials/plugins/info_event.html'
		controller: 'InfoEventCtrl'

## CONTENT
	$routeProvider.when '/content/:name',
		templateUrl: 'partials/plugins/content_article_fullpage.html'
		controller: 'ContentArticleFullPageCtrl'

## PROFILE PAGES
	$routeProvider.when '/profile/people',
    templateUrl: 'partials/plugins/info_userprofile.html'
    controller: 'InfoUserProfileCtrl'

	$routeProvider.when '/profile/people/:userid',
    templateUrl: 'partials/plugins/info_userprofile.html'
    controller: 'InfoUserProfileCtrl'

	$routeProvider.when '/profile/startup',
    templateUrl: 'partials/plugins/info_startupprofile.html'
    controller: 'InfoStartUpProfileCtrl'

	$routeProvider.when '/profile/startup/:startupid',
    templateUrl: 'partials/plugins/info_startupprofile.html'
    controller: 'InfoStartUpProfileCtrl'

	$routeProvider.when '/profile/investor',
    templateUrl: 'partials/plugins/info_investorprofile.html'
    controller: 'InfoInvestorProfileCtrl'

	$routeProvider.when '/profile/investor/:investorid',
    templateUrl: 'partials/plugins/info_investorprofile.html'
    controller: 'InfoInvestorProfileCtrl'

	$routeProvider.when '/profile/xspace',
    templateUrl: 'partials/plugins/info_xspaceprofile.html'
    controller: 'InfoXspaceProfileCtrl'

	$routeProvider.when '/profile/xspace/:xspaceid',
    templateUrl: 'partials/plugins/info_xspaceprofile.html'
    controller: 'InfoXspaceProfileCtrl'

	$routeProvider.when '/profile/coworking',
    templateUrl: 'partials/plugins/info_coworkingprofile.html'
    controller: 'InfoCoworkingProfileCtrl'

	$routeProvider.when '/profile/coworking/:coworkingid',
    templateUrl: 'partials/plugins/info_coworkingprofile.html'
    controller: 'InfoCoworkingProfileCtrl'

	$routeProvider.when '/profile/community',
    templateUrl: 'partials/plugins/info_communityprofile.html'
    controller: 'InfoCommunityProfileCtrl'

	$routeProvider.when '/profile/community/:communityid',
    templateUrl: 'partials/plugins/info_communityprofile.html'
    controller: 'InfoCommunityProfileCtrl'

	$routeProvider.when '/profile/service',
    templateUrl: 'partials/plugins/info_serviceprofile.html'
    controller: 'InfoServiceProfileCtrl'

	$routeProvider.when '/profile/service/:serviceid',
	  templateUrl: 'partials/plugins/info_serviceprofile.html'
	  controller: 'InfoServiceProfileCtrl'

############### WIPs: incomplete/tests
## CLEANUP
	$routeProvider.when '/test-cleanup',
		templateUrl: 'partials/home.html'
		controller: 'TestCtrl'

## SGENOME TEST
	$routeProvider.when '/sgenome',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/sgenome/:country',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

	$routeProvider.when '/sgenome/:country/:filter',
		templateUrl: 'partials/sgenome.html'
		controller: 'StartupGenomeCtrl'

# OTHERWISE
	$routeProvider.otherwise redirectTo: '/home'
]