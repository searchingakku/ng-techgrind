var myAppModule = angular.module('FullPageModule', ['ui.bootstrap','TechGrindApp.controllers']);
myAppModule.service('FullPageService', ['$dialog', 'steam','$rootScope',
function($dialog, steam, $rootScope) {

	this.open = function(id) {

		dialogOptions = {
			title : 'my test title....'
		}

		var dialogDefaults = {
			backdrop : true,
			keyboard : true,
			backdropClick : true,
			dialogFade : true,
			templateUrl : 'partials/content_article_fullpage.html',
			dialogClass : 'modal FullPage'
		};
		dialogDefaults.controller = function($scope, dialog) {
			$scope.dialogOptions = dialogOptions;
			$scope.dialogOptions.close = function(result) {
				dialog.close(result);
			};
		}

		var d = $dialog.dialog(dialogDefaults);
		d.open();

	};

}]); 