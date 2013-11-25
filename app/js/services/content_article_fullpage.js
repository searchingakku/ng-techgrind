/*
	content_article_fullpage:
		display-style___________
		*
		*
		
		example:
		*
		*
 
		functional goal___________
					
		example-item -> displayed information ==> action-on-interaction:
			
*/

(function() {
	var app = angular.module('ContentFullPageModal', [ 'ui.bootstrap' ]);
	app.service('ContentFullPageModalService', ['$modal', 'steam', '$rootScope',
		 function($modal, steam, $rootScope) {

		 	var contentdata = {
		 	type:'news',
		 	labels: ['startups','thailand','singapore'],
		 	author:'Efraim Pettersson',
			source:'http://efraimip.blogspot.com',
			date:'12-03-2013',
			time:'18:06',
			twitterid:'@EfraimIP',
			websiteurl:'www.grinder.com',
			title:'Test Title....',
			content:'we rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlrwe rowaej roiwaej roiwaej roijaweo rawo hriuaw ehriuawh eriu haweiurhawilu rhw eiouqwh eiuqwh riawheiouhwe tuiohw iut hiwuae htiuawh tiuw htiuhw atil hwaelit hiweauh tiweua htiuwea htilwah tiwha  it hew woeh riweh riuha wrihaweir hilwearh iluwea hrliw aherhliwar hi ewlr',
			rating:5
			};
			var user = null;
			var self = this;
			self.isOpen = false;
			self.isLogged = false;
			/* why are you doing this twice???
			self.user = steam.loginp();
			self.loginp = steam.loginp;
			*/

			this.open = function() {
				self.isOpen = true;
				// lets check if the user is logged
				self.user = steam.loginp();
				self.loginp = steam.loginp;

				var dialogDefaults = {
				backdrop : false,
				keyboard : true,
				backdropClick : true,
				dialogFade : true,
				templateUrl : 'partials/services/content_article_fullpage.html',
				template : '',
				controller : ModalInstanceCtrl,
				windowClass : 'modal articlefullpage',
				resolve : {
					dialogData : function() {
						return self.dialogData;
					},
					user : function() {
						return self.user;
					},
					loginp : function() {
						return self.loginp;
					}
				}};
				var modalInstance = $modal.open(dialogDefaults);

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

			var ModalInstanceCtrl = function($scope, $modalInstance, dialogData, user, loginp) {
				$scope.dialogData = contentdata;
				$scope.user = user;
				$scope.loginp = loginp;

				$scope.close = function(result) {
					try{
						$modalInstance.close();
					} catch(e) {
						console.warn('Update bootstrap librarie to get ride of the error');
					}
				};
				$scope.login = function(result) {
					console.log('Trying to login...');
					$rootScope.openlogin = true;
				};
				$scope.rateThis = function(result) {
					if(loginp) {
						var jsonMsg = {
							title: this.title,
							rating: this.rating
						};
						// lets steam the information
						steam.put('rating', jsonMsg).then(function() {
							console.log('Steam put.....');
						});
					} else {
						$scope.login();
					}
				};
			};
	}]);
}).call(this);