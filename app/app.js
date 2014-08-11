var app = angular.module("app", [
	'ngResource',
	'ngRoute',
	'ngAnimate',
	'mobile-angular-ui'
]);

app.run(function($rootScope) {
	$rootScope.user = {};

	// Deal with animations (set $routeProvider.when('/', animateIn: 'fadeInUpBig', animateOut: 'fadeOutDownBig'}))
	$rootScope.routingCount = 0; // Count the number of routes we've made
	$rootScope.$on('$routeChangeStart', function(e, current){
		if (current && $rootScope.routingCount++ == 0) // Force disable initial animation if viewing the page for the first time
			current.animateIn = null;
		$rootScope.animateClass = [
			current && current.animateIn || 'snapIn',
			current && current.animateOut || 'snapOut'
		];
	})
});

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: "/templates/home.html",
		animateIn: 'zoomIn'
	});
	$routeProvider.when('/timer/:id', {
		templateUrl: "/templates/timer.html",
		animateIn: 'fadeInRightBig'
	});
	$routeProvider.when('/error', {
		templateUrl: "/templates/error.html",
		animateIn: 'fadeInUpBig'
	});
	$routeProvider.when('/settings', {
		templateUrl: "/templates/settings.html",
		animateIn: 'fadeInUpBig',
		animateIn: 'fadeOutDownBig'
	});
});
