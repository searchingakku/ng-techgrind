var appModule = angular.module('TechGrindApp.controllers.info.startupprofile', []);

appModule.controller('InfoStartUpProfileCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

	$scope.maintabs = [
		'News & Articles',
		'Startups',
		'Investments',
		'Followers',
		'Groups'
	];
	
}]);