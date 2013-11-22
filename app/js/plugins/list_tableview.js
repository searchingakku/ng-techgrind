/*
	list_tableview:
		display-style___________
		this list object should display elements in a vertical 1-column list with:
		* type
		* location (city)
		* name / abbreviation
		* date
		* time
		* price
		* {short-description}
		
		example:
		* Event
		* Thailand
		* SLAP
		* Speak, Learn, and Pitch:
		* Thursday, 21-11-2013
		*	18:00 - 22:00
		* FREE!
 
		functional goal___________
		this list object should display in a narrow/compact height+full width table-type grid.
			it should serve as a quick-information listing of actionable items and should
			send the user to a full-profile page or handling page for the item on interaction.
			
		example-item -> displayed information ==> action-on-interaction:
			investors/startups/services -> small logo thumbnail + detailed info ==> profile page
*/

(function() {

	var appModule = angular.module('TechGrindApp.controllers.list.tableview', []);

	appModule.controller('ListActivitiesCtrl', ['$scope', 'steam', '$http',
	function($scope, steam, http) {

		$scope.listClickLink = function(url) {
		  if(url !== undefined) {
		   	return document.location = url;
			}
		};

		var activities = [{
			type: 'Event',
			location: 'Thailand',
			name: 'Speak.Learn.And.Pitch',
			date: '18/12/2013',
			time: '18:00',
			price: 'FREE',
			descriptionshort: 'Speak.Learn.And.Pitch - Come learn to pitch with fellow startups and get an info session from a local investor!'
		}, {
			type: 'Workshop',
			location: 'Thailand',
			name: 'CFF',
			date: '20/12/2013',
			time: '18:00',
			price: 'FREE',
			descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
		}, {
			type: 'Event',
			location: 'Thailand',
			name: 'CFF',
			date: '24/12/2013',
			time: '18:00',
			price: 'FREE',
			descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
		}, {
			type: 'Conferece',
			location: 'Singapore',
			name: 'StartupJobz Job Fair @ National University of Singapore',
			date: '27/12/2013',
			time: '18:00',
			price: 'FREE',
			descriptionshort: 'Come get a job at a startup!'
		}];

		return $scope.activities = activities;
	}]);

}).call(this);
