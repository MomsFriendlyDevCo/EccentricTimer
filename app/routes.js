app.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "/templates/home.html",
			animateIn: 'zoomIn'
		})
		.when('/timer/:id', {
			templateUrl: "/templates/timer.html",
			animateIn: 'fadeInRightBig'
		})
		.when('/error', {
			templateUrl: "/templates/error.html",
			animateIn: 'fadeInUpBig'
		})
		.when('/settings', {
			templateUrl: "/templates/settings.html",
			animateIn: 'fadeInUpBig',
			animateIn: 'fadeOutDownBig'
		})
});
