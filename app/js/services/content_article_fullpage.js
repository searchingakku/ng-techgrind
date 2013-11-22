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

var myAppModule = angular.module('ContentFullPageModal', ['ui.bootstrap','TechGrindApp.controllers']);
myAppModule.service('ContentFullPageModalService', ['$dialog', 'steam','$rootScope',
function($dialog, steam, $rootScope) {
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

		var dialogOptions = contentdata;

		var dialogDefaults = {
			backdrop : true,
			keyboard : true,
			backdropClick : true,
			dialogFade : true,
			templateUrl : 'partials/services/content_article_fullpage.html',
			dialogClass : 'modal'
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