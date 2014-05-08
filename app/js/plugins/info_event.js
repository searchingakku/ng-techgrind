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

        // for testing purposes, need to get event info from steam
        $scope.event = {}
        $scope.newschedule = {}
        $scope.rp = rp
/* 
              { title: "SLAP",
		tags: ["tag1", "tag2", "tag3"], 
                description: "Meet friends and good stuff", 
                schedule: [{
                        city: "BKK", 
                        address: "Asoke BTS", 
                        date: "2/2/14",
                        time: "1300", 
                        source: "FB"},
                        {
                        city: "ON NUT", 
                        address: "Silom soi 4", 
                        date: "3/2/14",
                        time: "1800", 
                        source: "Juan"}]
	};
*/
        // keep a copy to undo changes when user cancels edit
        $scope.master = angular.copy($scope.event);

        // flag used for testing the display of pencil icon 
        // and editing only if user is owner of event
        $scope.owner = true;

        var get_event = function(data) {
          $scope.data = data;
          $scope.event = data.event
        };

        steam.get('techgrind.events.'+rp.name).then(get_event);

	$scope.EventInfoUpdate = function(field)
	{
            if ( field.match("tags") )
            {
                var newTags = [];
                var csvTags = $scope.event.tags.split(',');
                csvTags.forEach(function(tag){
                            newTags.push(tag.trim());
                        });
                $scope.event.tags = newTags;
            }
            $scope.update();
	}

        /**
         * Update existing event in the schedule.
         */
        $scope.updateEvent = function(index, event)
        {
            $scope.event.schedule[index] = event;
            $scope.update();
        }

        /**
         * Clear any edits made while adding a new event. 
         */
        $scope.cancelEventEdit = function()
        {
            $scope.reset();
            $scope.eventItem.selected = null;
        }

        /**
         * Clear any edits made if user pressed cancel.
         */
        $scope.reset = function()
        {
            angular.copy($scope.master, $scope.event);
        }

        /**
         * Accept user edits.
         */
        $scope.update = function()
        {
            $scope.master = angular.copy($scope.event);
            $scope.eventItem.selected = null;

            // and make call here to steam
            // steam ...
            //
        }


        /**
         * Add a new event to the schedule. 
         */
	$scope.add_schedule = function()
	{
            var handle_newschedule = function(data)
            {
                $scope.result = data;
                $scope.event = data.event;
                $scope.cancelNewEvent();
            }

            // accept user edits
            // $scope.update();
            steam.put('techgrind.events.'+rp.name, $scope.newschedule).then(handle_newschedule);
            // clear form fields
	}

        $scope.eventItem = { selected: null };

        /**
         * Event selected in schedule table.
         */
        $scope.editEvent = function(index)
        {
            $scope.eventItem.selected = index;
        }

        /**
         * Clear new event form. Restores original placeholders for fields below.
         */
        $scope.cancelNewEvent = function(index)
        {
            $scope.newschedule.address = null;
            $scope.newschedule.city = null;
            $scope.newschedule.country = null;
            $scope.newschedule.date = null;
            $scope.newschedule.time = null;
            $scope.newschedule.source = null;
        }
}]);

// this controller is used to create a new activity.
// using the same view: info_acitivity.html - in edit/ownership mode
appModule.controller('InfoEventCreateNewCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

}]);
