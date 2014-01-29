/*
  info_event:
    functional goal___________
    * 
    *
    *
    *

    display-style___________
    * 
    *
    *
    *

    example:
*/

var appModule = angular.module('TechGrindApp.controllers.info.event', []);

appModule.controller('InfoEventCtrl', ['$scope', 'steam', '$routeParams',
function($scope, steam, rp) {

	var user = null;
	var self = this;
	var eventdata = null;
	var get_event = function(data)
	{
		if (data['event'])
		$scope.eventdata = data['event'];
	}

	//steam.get('/home/techgrind/events/all/'+rp.name).then(get_event);

	eventdata = [{
		title: "Event Title",
		tags: ["tag1", "tag2", "tag3"]
	}];

}]);

// this controller is used to create a new activity.
// using the same view: info_acitivity.html - in edit/ownership mode
appModule.controller('InfoEventCreateNewCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

}]);