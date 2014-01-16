(function() {
	var app;

	app = angular.module('TechGrindApp.controllers.regions', []);

	app.controller('RegionsCtrl', ['$scope', '$location', 'steam', 'ToolsRichEditorService', '$http', '$routeParams', function($scope, loc, steam, richEditor, http, rp) {
		$scope.rp = rp;
		$scope.compose = function() {
			return richEditor.open("news");
		};
		return $scope.tabCalendarSelect = function() {
			return $('#calendar').fullCalendar('render');
		};
	}]);

}).call(this);
