app.controller('settingsController', function($scope, $rootScope, $routeParams) {
	$scope.testTTS = function() {
		$scope.say('Hello World');
	};
});
