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

        // for testing purposes, need to get event info from steam
	$scope.eventdata = {
		title: "SLAP",
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
        // keep a copy to undo changes when user cancels edit
        $scope.master = angular.copy($scope.eventdata);

        // flag used for testing the display of pencil icon 
        // and editing only if user is owner of event
        $scope.owner = true;

	var get_event = function(data)
	{
		if (data['event'])
		$scope.eventdata = data['event'];
	}


	$scope.EventInfoUpdate = function(field)
	{
            if ( field.match("tags") )
            {
                var newTags = [];
                var csvTags = $scope.eventdata.tags.split(',');
                csvTags.forEach(function(tag){
                            newTags.push(tag.trim());
                        });
                $scope.eventdata.tags = newTags;
            }
            $scope.update();
	}

        /**
         * Update existing event in the schedule.
         */
        $scope.updateEvent = function(index, eventdata)
        {
            $scope.eventdata.schedule[index] = eventdata;
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
            angular.copy($scope.master, $scope.eventdata);
        }

        /**
         * Accept user edits.
         */
        $scope.update = function()
        {
            $scope.master = angular.copy($scope.eventdata);
            $scope.eventItem.selected = null;

            // and make call here to steam
            // steam ...
            //
        }


        /**
         * Add a new event to the schedule. 
         */
	$scope.addEvent = function()
	{
            // update these fields depending on fields deemed necessary 
            // for new events
            var newEvent = {
                address: $scope.insertAddress,
                city: $scope.insertCity,// + "," + $scope.insertCountry,
                date: $scope.insertDate,
                time: $scope.insertTime,
                source: $scope.insertSource
            };

            $scope.eventdata.schedule.push(newEvent);

            // clear form fields
            $scope.cancelNewEvent();
            // accept user edits
            $scope.update();

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
        $scope.cancelNewEvent= function(index)
        {
            $scope.insertAddress = null;
            $scope.insertCity = null;
            $scope.insertCountry = null;
            $scope.insertDate = null;
            $scope.insertTime = null;
            $scope.insertSource = null;
        }
}]);

// this controller is used to create a new activity.
// using the same view: info_acitivity.html - in edit/ownership mode
appModule.controller('InfoEventCreateNewCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

}]);
