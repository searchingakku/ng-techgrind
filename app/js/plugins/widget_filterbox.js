/*
	widget_filterbox:
		display-style___________
		this widget is used as a filterbox for content on the page
		* 

	example:
		* 

	functional goal___________
		* dropdownbox with "region select" -- filtered contents should update OnSelect
		* textbox "tag it" keywords -- filtered contents should update OnKeywordAdded
			http://timschlechter.github.io/bootstrap-tagsinput/examples/
			http://aehlke.github.io/tag-it/
*/

var appModule = angular.module('TechGrindApp.plugins.widget.filterbox', []);

appModule.controller('WidgetFilterbox', ['$scope', 'steam', '$http', 'settings',
function($scope, steam, http, settings) {
	$scope.regions = regions; // list of available regions should come from the server in the future
	$scope.active_regions = settings.get('regions');
	$scope.keywords = settings.get('keywords');
}]);

var regions = [ 'Thailand', 'Singapore', 'Malaysia', 'China', 'Korea', 'Japan', 'Vietnam', 'Philippines' ];