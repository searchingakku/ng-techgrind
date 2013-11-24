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

var appModule = angular.module('ContentFullPageModal', []);

appModule.service('ContentFullPageModalService', ['$modal', 'steam', '$rootScope',
	function($modal, steam, $rootScope) {
		var contentdata = {
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
		this.open = function(id) {

			var dialogDefaults = {
				templateUrl : 'partials/services/content_article_fullpage.html',
				template : '',
				scope : '',
				controller : ModalInstanceCtrl,
				resolve : '',
				backdrop : '',
				keyboard : '',
				windowClass : 'modal'
			};

			var modalInstance = $modal.open(dialogDefaults);
		};
		
		var ModalInstanceCtrl = function ($scope, $modalInstance) {

			var dialogOptions = contentdata;

		  $scope.ok = function () {
		    $modalInstance.close($scope.selected.item);
		  };

		  $scope.cancel = function () {
		    $modalInstance.dismiss('cancel');
		  };
		};
	}
]);