var appModule = angular.module('TechGrindApp.controllers.info.startupprofile', []);

appModule.controller('InfoStartUpProfileCtrl', ['$scope', 'steam', '$http', '$rootScope',
function($scope, steam, http, $rootScope) {

	$scope.maintabs = maintabs;
	$scope.news = news;
	
}]);

function ProfileTabCtrl($scope){
	$scope.content = 'Profile';
}

function NewsTabCtrl($scope){
	$scope.news = news;
}

function JobsTabCtrl($scope){
	$scope.content = 'Profile';
}

function ContentTabCtrl($scope){
	$scope.content = 'Content';
}

function FundraisingCtrl($scope){
	$scope.content = 'Fundraising';
}

var maintabs = [{
	title: 'Profile',
	controller: ProfileTabCtrl,
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
	title: 'News',
	controller: NewsTabCtrl,
	anotherproperty: 'asdf'
}, {
	title: 'Jobs',
	controller: JobsTabCtrl,
	anotherproperty: 'asdf'
}, {
	title: 'Content',
	controller: ContentTabCtrl,
	anotherproperty: 'asdf'
}, {
	title: 'Fundraising',
	controller: FundraisingCtrl,
	anotherproperty: 'asdf'
}];

var allNews =[{
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
