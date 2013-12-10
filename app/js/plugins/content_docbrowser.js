/*
	content_docbrowser:
		display-style___________
		this content display plugin should display a file-browser-like window.
			it should have a breadcrumb navigation added to it so that users can
			smartly navigate up and down a category tree.
			both individual files/objects can be viewed in one container as well as
			categories (eg: folders).
			these should be all displayed as small thumbnails with the following info:
		* <thumbnail:filetype> (eg: folder, PDF, word-doc, image, source-code, office-document)
		* name
		* author [does not show on "folders/categories"]
		* rank (1 to 5 stars) [does not show on "folders/categories"]
		
		example folder:
		* <image:folder>
		* Legal Templates

		example doc:
		* <image:PDF>
		* NDA - Harvard-Business-School
		* HBS Administration Team
		* 5
		
		example office-document:
		* <image:calc-sheet>
		* Founder Equity Calculator
		* Efraim Pettersson
		* 4
		
		functional goal___________
		this plugin should display objects in a filebrowser-like-fashion.
			user interacts with plugin im similar fashion as a file-browser.
			clicking on a folder, takes user to another sub-category.
			breadcrumb navigation is maintained in the navigation bar at top of plugin.
			when user clicks on file/doc/object, user should have the option to download, or open.
			the "open" button should be grayed out, if it is an object-type we do not have an application
			on the website to open the object with. eg: .psd file (needs photoshop, and we dont have it on
			the website).
			
		example-object -> displayed information ==> action-on-interaction:
			doc/template/file -> object thumbnail + name ==> full-content-view // download to user
*/

(function() {

	var app = angular.module('TechGrindApp.controllers.content.docbrowser', []);

	// I control the root of the application.
	app.controller("ContentDocsCtrl", ['$scope', '$location', 'steam','$routeParams', '$http', 'DocsSharedData',
	function($scope, loc, steam, $routeParams, $http, DocsSharedData) {

		$scope.data = DocsSharedData;
		var oldData = $scope.data.iodActive;
		callHttp();

		$scope.$on('iodActive', function(event, x) {
			if(x != oldData){
				$scope.docs = [];
				$scope.data = DocsSharedData;
				oldData = $scope.data.iodActive;
				callHttp();
			}
		});

		$scope.modifyUrlForFiles = function(path){
			return 'http://dev-back1.techgrind.asia/'+path;
		};

		function callHttp(){
			var listOfCatFromJson = $http.get('http://dev-back1.techgrind.asia/scripts/rest.pike?request=/'+$scope.data.iodActive);
			listOfCatFromJson.success(function(data){
				console.log('Data for menu...', data.inventory);
				$scope.docs = data.inventory;
			});
		};

	}]);


}).call(this);