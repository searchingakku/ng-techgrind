var myAppModule = angular.module('RichEditorModule', ['ui.bootstrap','TechGrindApp.controllers']);
myAppModule.service('RichEditorService', ['$dialog', 'steam','$rootScope',
function($dialog, steam, $rootScope) {

	var self = this;
	var elementID = 'inputContentRichText';

	self.isOpen = false;

	var dialogDefaults = {
		backdrop : false,
		keyboard : true,
		backdropClick : true,
		dialogFade : true,
		templateUrl : 'partials/services/tools_richeditor.html',
		dialogClass : 'modal myWindow'
	};

	var dialogOptions = {
		closeButtonText : 'Cancel',
		actionButtonText : 'Publish',
		saveButtonText : 'Save',
		loginButtonText : 'Login',
		isLoged : false,
		title : '',
		category : '',
		labels : '',
		fullText : ''
	};

	var dialogCategories = [
		'news',
		'guides',
		'tutorials'
	];

	var user = null;

	this.open = function(customDialogDefaults, customDialogOptions) {
		if (!self.isOpen) {
			self.isOpen = true;
			if (!customDialogDefaults) {
				customDialogDefaults = {};
			}
			
			//$dialog.data = {};
			//lets check if the user is logged
			user = steam.loginp();
			
			dialogOptions.loginp = steam.loginp;
			
			console.log('User ', user);
			if(!!user){
				dialogOptions.isLoged = true;
			}else{
				dialogOptions.isLoged = false;
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
				$scope.dialogOptions.login = function(result) {
					console.log('Trying to login...');
					$rootScope.openlogin=true;
					//loginCtrl.openLogin();
					
				};
				$scope.dialogOptions.save = function(result) {
					var jsonMsg = {
						title : $scope.dialogOptions.title,
						fullText : tinyMCE.get(elementID).getContent(),
						labels : $scope.dialogOptions.labels
					};

					//lets steam the information
					steam.put('news', jsonMsg).then(function(){
						console.log('Steam posted.....');
					});
				};
				$scope.dialogOptions.post = function() {
					var jsonMsg = {
						title : $scope.dialogOptions.title,
						fullText : tinyMCE.get(elementID).getContent(),
						labels : $scope.dialogOptions.labels
					};

					//lets steam the information
					steam.post('news', jsonMsg).then(function(){
						console.log('Steam posted.....');
						dialog.close();
						self.isOpen = false;
					});
				};
				$scope.dialogOptions.formValid = function() {
					return $scope.dialogOptions.title.length > 0;
				};
			}
		}
		var d = $dialog.dialog(tempDialogDefaults);
		d.open();
		self.waitForVisible();
		
	};


	this.waitForVisible = function() {
		if($('.modal.myWindow').is(':visible')){
			self.activateTinyMce();
		}else{
			setTimeout(function(){
				self.waitForVisible();
			},100);
		}
	};

	this.activateTinyMce = function() {
		console.log('Activate TinyMce loaded....');
		tinymce.init({
			selector : "#" + elementID,
			plugins: [
				"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
				"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
				"save table contextmenu directionality emoticons template paste textcolor"
			],
			width : '100%',
			height : 310,
			browser_spellcheck : true,
			statusbar : false,
			menubar : false,
			paste_as_text : true,
			toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | link image media | bullist | forecolor backcolor", 
			charLimit : 100000, // this is a default value which can get modified later
		});
	};
}]); 