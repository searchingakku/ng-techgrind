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

var appModule = angular.module('TechGrindApp.controllers.list.tableview', []);

appModule.controller('ListActivitiesCtrl', ['$scope', 'steam', '$http',
function($scope, steam, http) {

	$scope.activities = [{
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
	}, {
		type: 'Event',
		location: 'Philippines',
		name: 'Speak.Learn.And.Pitch',
		date: '18/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Speak.Learn.And.Pitch - Come learn to pitch with fellow startups and get an info session from a local investor!'
	}, {
		type: 'Workshop',
		location: 'Philippines',
		name: 'CFF',
		date: '20/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
	}, {
		type: 'Event',
		location: 'Philippines',
		name: 'CFF',
		date: '24/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
	}, {
		type: 'Conferece',
		location: 'Philippines',
		name: 'StartupJobz Job Fair @ National University of Singapore',
		date: '27/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Come get a job at a startup!'
	}, {
		type: 'Event',
		location: 'Cambodia',
		name: 'Speak.Learn.And.Pitch',
		date: '18/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Speak.Learn.And.Pitch - Come learn to pitch with fellow startups and get an info session from a local investor!'
	}, {
		type: 'Workshop',
		location: 'Cambodia',
		name: 'CFF',
		date: '20/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
	}, {
		type: 'Event',
		location: 'Cambodia',
		name: 'CFF',
		date: '24/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Coding.For.Fun -- Come code for fun!!! Learn Pike!'
	}, {
		type: 'Conferece',
		location: 'Cambodia',
		name: 'StartupJobz Job Fair @ National University of Singapore',
		date: '27/12/2013',
		time: '18:00',
		price: 'FREE',
		descriptionshort: 'Come get a job at a startup!'
	}];

	$scope.cols = [{field:'type', displayName:'Type'},
							{field:'location', displayName:'Location'}, 
							{field:'name', displayName:'Name'}, 
							{field:'date', displayName:'Date'}, 
							{field:'time', displayName:'Time'}, 
							{field:'price', displayName:'Price'}];
	$scope.gridOptions = {
		data: 'activities',
		columnDefs: 'cols',
		multiSelect: false,
		plugins: [new ngGridFlexibleHeightPlugin()],
		minHeight: 600
	};

	$scope.listClickLink = function(url) {
	  if(url !== undefined) {
	   	return document.location = "#/events/" + url;
		}
	};

	$scope.filterByLocation = function(location) {
		// location can be an array or a single value
		var newData;
		for(i = activities.length; i < activities.length; i++) {
			if(location in activities.location) {
				newData += activities[i];
			}
		}
		$scope.gridOptions.data	= newData;
	};

/*
	$scope.updatedTab = function(tab) {
		console.log(tab);
		$scope.currentTab = tab;
		$scope.percentTabs = ($scope.currentTab+1)/$scope.tabs.length * 100;

		window.setTimeout(function(){
			$(window).resize();
			$(window).resize();
		}, 1000);
	};
*/

}]);
