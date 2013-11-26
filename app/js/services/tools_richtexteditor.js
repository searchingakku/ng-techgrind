(function() {
	var app = angular.module('ToolsRichEditor', [ 'ui.bootstrap' ]);
	app.service('ToolsRichEditorService',
		['$modal', 'steam', '$rootScope',
		 function($modal, steam, $rootScope) {

			var self = this;
			self.isOpen = false;
			self.isLogged = false;
			self.user = steam.loginp();
			self.loginp = steam.loginp;

//			self.dialogCategories = [ {
//				name : 'news'
//			}, {
//				name : 'guides'
//			}, {
//				name : 'tutorials'
//			} ];
			self.dialogCategories = ['news','guides','tutorials'];
			var user = null;

			this.open = function() {

				self.isOpen = true;
				// lets check if the user is logged
				self.user = steam.loginp();
				self.loginp = steam.loginp;

				var modalInstance = $modal.open({
					backdrop : false,
					keyboard : true,
					backdropClick : true,
					dialogFade : true,
					templateUrl : 'partials/services/tools_richeditor.html',
					controller : ModalInstanceCtrl,
					windowClass : 'modal myWindow',
					resolve : {
						dialogCategories : function() {
							return self.dialogCategories;
						},
						user : function() {
							return self.user;
						},
						loginp : function() {
							return self.loginp;
						}
					}
				});
				
				modalInstance.result.then(function (selectedItem) {
					
				}, function () {
					console.info('Modal dismissed at: ' + new Date());
					self.isOpen = false;
				});
				
				modalInstance.opened.then(function (selectedItem) {
					console.log('modal opened');
					self.waitForVisible()
				});
			};
			var ModalInstanceCtrl = function($scope,$modalInstance, dialogCategories, user, loginp) {
				$scope.dialogCategories = dialogCategories;
				$scope.selectedCategory = $scope.dialogCategories[0];

				$scope.user = user;
				$scope.loginp = loginp;

				$scope.close = function(result) {
					try{
						$modalInstance.close();
					} catch(e){
						console.warn('Update bootstrap librarie to get ride of the error');
					}
				};
				$scope.login = function(result) {
					console.log('Trying to login...');
					$rootScope.openlogin = true;
				};
				$scope.save = function(result) {
					var jsonMsg = {
						title : this.title,
						fullText : tinyMCE.get('inputContentRichText').getContent(),
						labels : this.labels,
						category : this.selectedCategory
					};
					// lets steam the information
					steam.put('news', jsonMsg).then(function() {
						console.log('Steam put.....');
					});
				};
				$scope.post = function() {
					var jsonMsg = {
						title : this.title,
						fullText : tinyMCE.get('inputContentRichText').getContent(),
						labels : this.labels,
						category : this.selectedCategory
					};

					// lets steam the information
					steam.post('news', jsonMsg).then(function() {
						console.log('Steam post.....');
						try{
							$modalInstance.close();
						} catch(e){
							console.warn('Update bootstrap librarie to get ride of the error');
						}
					});
				};
			};

			self.waitForVisible = function() {
				if($('.modal.myWindow').is(':visible')){
					self.activateTinyMce();
				}else{
					setTimeout(function(){
						self.waitForVisible();
					},100);
				}
			};
			self.activateTinyMce = function() {
				console.log('Activate TinyMce loaded....');
				tinymce.init({
							selector : "#inputContentRichText",
							plugins : [
									"advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
									"searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
									"save table contextmenu directionality emoticons template paste textcolor" ],
							width : '100%',
							height : 310,
							browser_spellcheck : true,
							statusbar : false,
							menubar : false,
							paste_as_text : true,
							toolbar : "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | link image media | bullist | forecolor backcolor",
							charLimit : 100000, // this is a
												// default
												// value
												// which can
												// get
												// modified
												// later
						});
			};
		}]);
}).call(this);