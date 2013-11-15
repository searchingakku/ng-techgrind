var myAppModule = angular.module('RichEditorModule', ['ui.bootstrap']);
myAppModule.service('RichEditorService', ['$dialog',
function($dialog) {

	var self = this;

	self.isOpen = false;

	var dialogDefaults = {
		backdrop : false,
		keyboard : true,
		backdropClick : true,
		dialogFade : true,
		templateUrl : 'partials/richEditor.html',
		dialogClass : 'modal myWindow'
	};

	var dialogOptions = {
		closeButtonText : 'Cancel',
		actionButtonText : 'Publish'
	};

	this.open = function(customDialogDefaults, customDialogOptions) {
		if (!self.isOpen) {
			self.isOpen = true;
			if (!customDialogDefaults) {
				customDialogDefaults = {};
			}
			this.showDialog(customDialogDefaults, customDialogOptions);
		}
	};

	this.showDialog = function(customDialogDefaults, customDialogOptions) {
		//Create temp objects to work with since we're in a singleton service
		var tempDialogDefaults = {};
		var tempDialogOptions = {};

		//Map angular-ui dialog custom defaults to dialog defaults defined in this service
		angular.extend(tempDialogDefaults, dialogDefaults, customDialogDefaults);

		//Map dialog.html $scope custom properties to defaults defined in this service
		angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);

		if (!tempDialogDefaults.controller) {
			tempDialogDefaults.controller = function($scope, dialog) {
				$scope.dialogOptions = tempDialogOptions;
				$scope.dialogOptions.close = function(result) {
					dialog.close(result);
					self.isOpen = false;
				};
				$scope.dialogOptions.callback = function() {
					dialog.close();
					self.isOpen = false;
					customDialogOptions.callback();
				};
			}
		}
		var d = $dialog.dialog(tempDialogDefaults);
		d.open();
		setTimeout(function() {
			self.activateTinyMce();
		}, 310);
	};

	this.activateTinyMce = function() {
		console.log('Activate TinyMce loaded....');
		//var leftOver = $('#composeGlobalDiv').find('.row-fluid.newpostform').height();
		tinymce.init({
			selector : "#inputForRichText",
			//theme : 'advanced',
			//plugins : 'autoresize',
			width : '90%',
			height : 250,
			//autoresize_min_height: 400,
			//autoresize_max_height: 800,
			browser_spellcheck : true,
			statusbar : false,
			menubar : false,
			plugins : "paste",
			paste_as_text : true,
			//entity_encoding : "raw",
			charLimit : 100000, // this is a default value which can get modified later
			setup : function(editor) {
				editor.on('change', function() {
					//define local variables
					var tinymax, tinylen;
					//setting our max character limit
					tinymax = this.settings.charLimit;
					//grabbing the length of the curent editors content
					tinylen = this.getContent({
						"format" : "raw"
					}).length;
					koSpacesDetail.leftCharacters(tinymax - tinylen + ' characters left');
					if (tinylen > tinymax) {
						console.log('Html lo long : size: ' + tinylen);
					}
				});
			}
		});
	};

}]); 