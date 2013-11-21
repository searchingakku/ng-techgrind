var myAppModule = angular.module('ContentFullPageModal', ['ui.bootstrap','TechGrindApp.controllers']);
myAppModule.service('ContentFullPageModalService', ['$dialog', 'steam','$rootScope',
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
			templateUrl : 'partials/services/content_article_fullpage.html',
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