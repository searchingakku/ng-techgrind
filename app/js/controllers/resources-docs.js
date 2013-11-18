(function() {

	var appModule = angular.module('TechGrindApp.controllers.resources.docs', []);

	appModule.controller('ResourcesDocsCtrl', ['$scope', '$location', 'steam', '$filter', 'TypekitService',
	function($scope, loc, steam, $filter, Typekit) {

		$scope.jobs = [{
			title : 'UX Designer',
			description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
		}, {
			title : 'DBA',
			description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
		}, {
			title : 'Web Developer',
			description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
		}];

		$scope.docs = [{
			type : 'pdf',
			src : 'http://www.ask-cato.com/wp-content/uploads/2012/02/PDF5.gif',
			title : 'How to build your startup.pdf',
			description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis ante non massa sollicitudin adipiscing. Quisque ornare lectus non tincidunt porta. Phasellus iaculis sit amet nunc eu tincidunt. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce eleifend quam quis est scelerisque vehicula. Donec vehicula velit felis, ut interdum felis laoreet lacinia. Mauris luctus, nunc at imperdiet sodales, nisi lorem rhoncus turpis, et mattis ligula lectus eget enim.'
		}, {
			type : 'pdf',
			src : 'http://www.ask-cato.com/wp-content/uploads/2012/02/PDF5.gif',
			title : 'Tech Talks',
			description : 'Get in-depth guidance about developing for iOS 7, learn practical coding tips and tricks, and obtain valuable one-on-one programming and design assistance in our lab. Choose which day is best for you app developer day or game developer day. Apply now.'
		}, {
			type : 'xls',
			src : 'http://png-1.findicons.com/files/icons/1637/file_icons_vs_2/256/xls.png',
			title : 'Budget',
			description : 'Capital budgeting (or investment appraisal) is the planning process used to determine whether an organization\'s long term investments such as new machinery, replacement machinery, new plants, new products, and research development projects are worth the funding of cash through the firm\'s capitalization structure (debt, equity or retained earnings). It is the process of allocating resources for major capital, or investment, expenditures.[1] One of the primary goals of capital budgeting investments is to increase the value of the firm to the shareholders.'
		}];

		$scope.loadData = function() {
			var url = 'https://typekit.com/api/v1/json/libraries/full?page=' + $scope.page + '&per_page=' + $scope.per_page + '&callback=JSON_CALLBACK';
			Typekit.getTypekits(url).then(function(response) {
				$scope.more = response.data.library.families.length === $scope.per_page;
				$scope.families = $scope.families.concat(response.data.library.families);
				$scope.status_bar = "Showing " + ($scope.families.length === 0 ? "0" : "1") + " to " + $filter('number')($scope.families.length) + " of " + $filter('number')(response.data.library.pagination.count) + " entries";

			});
		}

		$scope.show_more = function() {
			$scope.page += 1;
			$scope.loadData();
		}

		$scope.has_more = function() {
			return $scope.more;
		}

		$scope.per_page = 10;
		$scope.page = 1;
		$scope.families = [];
		$scope.more = true;
		$scope.status_bar = "";
		$scope.loadData();

	}]);

	appModule.factory('TypekitService', ['$http',
	function($http) {
		return {
			getTypekits : function(url) {
				return $http.jsonp(url);
			}
		}
	}]);

	/** Ajax Spinner **/
	angular.module('services.SharedServices', []).config(function($httpProvider) {
		$httpProvider.responseInterceptors.push('myHttpInterceptor');
		var spinnerFunction = function(data, headersGetter) {
			$("#loading").show();
			return data;
		};
		$httpProvider.defaults.transformRequest.push(spinnerFunction);
	}).factory('myHttpInterceptor', function($q, $window) {
		return function(promise) {
			return promise.then(function(response) {
				$("#loading").hide();
				return response;
			}, function(response) {
				$("#loading").hide();
				return $q.reject(response);
			});
		};
	});

	/** Ajax Spinner **/

}).call(this);
