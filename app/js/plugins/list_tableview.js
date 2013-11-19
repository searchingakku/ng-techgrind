/*
	list_tableview:
		display-style___________
		this list object should display elements in a vertical 1-column list with:
		* type
		* location (city)
		* name / abbreviation
		* short-description
		* date-time
		* price
		
		example:
		* Event
		* Bangkok, Thailand
		* SLAP
		* Speak, Learn, and Pitch:
			Practice pitching with fellow startups!
		* Thursday, 21-11-2013
			18:00 - 22:00
		* FREE!
 
		functional goal___________
		this list object should display in a narrow/compact height+full width table-type grid.
			it should serve as a quick-information listing of actionable items and should
			send the user to a full-profile page or handling page for the item on interaction.
			
		example-item -> displayed information ==> action-on-interaction:
			investors/startups/services -> small logo thumbnail + detailed info ==> profile page
*/

(function() {

	var appModule = angular.module('TechGrindApp.controllers.list.activities', []);

	appModule.controller('ActivitiesCtrl', ['$scope', 'steam',
	function($scope, steam) {

		var pts = [];
		
		var partnersList = [{
			title : '3 Day Startup',
			src : 'img/logos_partners/intl_3ds.png',
			url : 'http://www.3daystartup.org'
		}, {
			title : 'Sandbox Network',
			src : 'img/logos_partners/intl_sandbox.png',
			url : 'http://www.sandbox-network.com/'
		}, {
			title : 'LeanStartupCircle',
			src : 'img/logos_partners/intl_lsc.png',
			url : 'http://www.leanstartupcircle.com/'
		}, {
			title : 'NetDNA',
			src : 'img/logos_partners/intl_netdna.png',
			url : 'http://www.netdna.com/'
		}, {
			title : 'Rackspace',
			src : 'img/logos_partners/intl_rackspace.png',
			url : 'http://www.rackspacestartups.com/'
		}, {
			title : 'TNW',
			src : 'img/logos_partners/intl_tnw.png',
			url : 'http://thenextweb.com/'
		}, {
			title : 'Startup Club',
			src : 'img/logos_partners/th_suc.png',
			url : 'http://www.startupclubhq.com'
		}, {
			title : 'StartupJobs.Asia',
			src : 'img/logos_partners/sg_startupjobs.png',
			url : 'http://www.startupjobs.asia/'
		}, {
			title : 'Dreamstake',
			src : 'img/logos_partners/intl_dreamstake.png',
			url : 'http://www.dreamstake.net/'
		}, {
			title : 'Seedcamp',
			src : 'img/logos_partners/intl_seedcamp.png',
			url : 'http://www.seedcamp.com/'
		}, {
			title : 'StartupBootcamp',
			src : 'img/logos_partners/intl_startupbootcamp.png',
			url : 'http://www.startupbootcamp.org/'
		}, {
			title : 'TiE',
			src : 'img/logos_partners/intl_tie.jpg',
			url : 'http://www.tie.org/'
		}
		];

		for (var i = 0; i < partnersList.length; i++) {
			if (i % 3 == 0){
				pts.push([]);
			}
			pts[pts.length - 1].push(partnersList[i]);
		}

		return $scope.partners = pts;
	}]);

}).call(this);
