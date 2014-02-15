var appModule = angular.module('TechGrindApp.controllers.info.startupprofile', []);

appModule.controller('InfoStartUpProfileCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

	// $scope.maintabs = maintabs;
	// $scope.news = news;

	$scope.maintabs = maintabs;
	$scope.sidetabs = sidetabs;

	$scope.goToWebsite = function(url) {
		console.log(url);
		$window.open(url);
	}
	
}]);

// function ProfileTabCtrl($scope){
// 	$scope.content = 'Profile';
// }

// function NewsTabCtrl($scope){
// 	$scope.content = 'News';
// }

// function JobsTabCtrl($scope){
// 	$scope.content = 'Jobs';
// }

// function ContentTabCtrl($scope){
// 	$scope.content = 'Content';
// }

// function FundraisingCtrl($scope){
// 	$scope.content = 'Fundraising';
// }

var maintabs = [{
	title: 'Profile',
	// controller: ProfileTabCtrl,
	startupid: 'techgrind',
	name: 'TechGrind',
	location: 'Thailand',
	founders: ['efraimip','martinb'],
	team: ['paulo','tandavas'],
	bioshort: 'A single online platform for startups in Asia-Pacific',
	biolong: 'TechGrind is Asia\'s premier startup ecosystem. Made by startups, for startups. We are both an online and offline community with the sole focus of enabling entrepreneurs from all walks of life to succeed in building their ventures. From pitching contests, hackathons, workshops, and the strongest entrepreneurship network in Asia with global ties to the strongest networks around the world, TechGrind is all about helping people build amazing things and take ideas from concept to consumer.',
	website: 'http://techgrind.asia',
	facebook: 'https://www.facebook.com/techgrind',
	twitter: 'https://twitter.com/Tech_Grind',
	followers: 479,
}, {
	title: 'Demo',
	// controller: ContentTabCtrl,
	description: 'TechGrind is Asia\'s premier startup ecosystem. Made by startups, for startups. We are both an online and offline community with the sole focus of enabling entrepreneurs from all walks of life to succeed in building their ventures. From pitching contests, hackathons, workshops, and the strongest entrepreneurship network in Asia with global ties to the strongest networks around the world, TechGrind is all about helping people build amazing things and take ideas from concept to consumer.',
}, {
	title: 'News',
	// controller: NewsTabCtrl,
	news: allNews
}, {
	title: 'Fundraising',
	// controller: FundraisingCtrl,
	content: 'Fundraising'
}];

var sidetabs = [{
	title: 'Jobs'
}, {
	title: 'Contact'
}];

var allNews = [{
	id: '1',
	type: 'news',
	location: 'Thailand',
	date: '7/1/2014',
	excerpt: 'TechGrind helps you socialize engage with your industry. ',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '2',
	type: 'events',
	location: 'Singapore',
	date: '10/1/2014',
	excerpt: 'TechGrind is democratizing tech-media. Share your knowledge',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '3',
	type: 'beta launch',
	location: 'Singapore',
	date: '10/1/2014',
	excerpt: 'TechGrind is democratizing tech-media. Share your knowledge',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '4',
	type: 'events',
	location: 'Singapore',
	date: '10/12/2013',
	excerpt: 'Introducing sTeam Powered',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '5',
	type: 'news',
	location: 'Singapore',
	date: '7/12/2013',
	excerpt: 'Introducing sTeam Powered',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '6',
	type: 'news',
	location: 'Singapore',
	date: '3/12/2013',
	excerpt: 'Introducing sTeam Powered',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}, {
	id: '7',
	type: 'news',
	location: 'Singapore',
	date: '1/12/2013',
	excerpt: 'Introducing sTeam Powered',
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris imperdiet quam id risus sodales dignissim. Nam et ullamcorper ante, in egestas libero. Sed enim dui, vestibulum sit amet ipsum sed, viverra tincidunt orci. Donec lacinia facilisis convallis. Phasellus nec pretium ligula, facilisis accumsan risus. Pellentesque ac ante sit amet orci porttitor mattis ut non augue. Donec feugiat nisl et metus rhoncus, ut volutpat ipsum placerat. Donec ut molestie sapien, ac tincidunt turpis.'
}];

var availableJobs = [{
	title : 'UX Designer',
	description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
}, {
	title : 'DBA',
	description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
}, {
	title : 'Web Developer',
	description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
}];
