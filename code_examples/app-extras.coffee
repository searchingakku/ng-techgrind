	$routeProvider.when '/content/',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content/:type',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content-page',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'

	$routeProvider.when '/:userid/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content:userid/:tab/:articlename/:tags',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/:userid/article/:articlename',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'

	$routeProvider.when '/:country/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/:country/articles/:tags',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/regions/:region/',
		templateUrl: 'partials/region-content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/articles',
		templateUrl: 'partials/content.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/:tab/:articlename',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentCtrl'

	$routeProvider.when '/content-page/:title',
		templateUrl: 'partials/content-page.html'
		controller: 'ContentPageCtrl'