

app = angular.module 'TechGrindApp.controllers.regions', []

app.controller 'RegionsCtrl', ['$scope', '$location', 'steam', 'ToolsRichEditorService', '$http', '$routeParams', ($scope, loc, steam, richEditor, http, rp) ->

	$scope.rp = rp;

	$scope.compose = ->
		richEditor.open()

	$scope.tabCalendarSelect = ->
		$('#calendar').fullCalendar 'render'
]
