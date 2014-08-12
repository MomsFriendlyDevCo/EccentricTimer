app.controller('timerController', function($scope, $rootScope, $routeParams, $location, $filter) {
	$scope.total = null;
	$scope.totalFormatted = null;

	$scope.refresh = function() {
		$scope.timerEnabled = false;
		$scope.timer = _.find($rootScope.timers, {id: $routeParams.id});
		$scope.activeScript = 0;
		for (var s in $scope.timer.script) {
			$scope.timer.script[s].value = $scope.timer.script[s].time;
			$scope.timer.script[s].valueFormatted = $filter('formatTimer')($scope.timer.script[s].value);
		}
		$scope.refreshTotal();
	};
	$scope.refreshTotal = function() {
		var sum = 0;
		for (var s in $scope.timer.script) {
			if ($scope.timer.script[s].value)
				sum += $scope.timer.script[s].value;
		}
		$scope.total = sum;
		$scope.totalFormatted = $filter('formatTimer')(sum);
	};
	$scope.refresh();

	// Watchers {{{
	$scope.activeScript = 0;
	$scope.$watch('activeScript', function() {
		for (var s in $scope.timer.script) {
			$scope.timer.script[s].active = (s == $scope.activeScript);
		}
	});
	// }}}

	if (!$scope.timer) {
		$location.path('/error');
		return;
	}

	$scope.timerEnabled = false;
	$scope.startTimer = function() {
		$scope.timerEnabled = true;
		setTimeout($scope.timerTick, 1000);
	};
	$scope.pauseTimer = function() {
		$scope.timerEnabled = false;
	};
	$scope.stopTimer = function() {
		$scope.refresh();
	};
	$scope.skipTimer = function(offset) {
		$scope.activeScript = offset;
		if ($scope.timer.script[$scope.activeScript].say) { // Say something - true for just repeat title, string otherwise
			if ($scope.timer.script[$scope.activeScript].say === true) { // Boolean true - repeat title
				$scope.say($scope.timer.script[$scope.activeScript].title);
			} else // String - just repeat whatever we're given
				$scope.say($scope.timer.script[$scope.activeScript].say);
		}
	};

	$scope.timerTick = function() {
		$scope.$apply(function() {
			if (!$scope.timerEnabled)
				return;
			var newValue = $scope.timer.script[$scope.activeScript].value - 1000;
			if (newValue <= 0) {
				$scope.timer.script[$scope.activeScript].value = 0;
				$scope.timer.script[$scope.activeScript].valueFormatted = $filter('formatTimer')($scope.timer.script[$scope.activeScript].value);
				$scope.timer.script[$scope.activeScript].active = false;
				$scope.skipTimer($scope.activeScript + 1);
				if ($scope.activeScript < $scope.timer.script.length) // Still more scripts to go
					$scope.timer.script[$scope.activeScript].active = true;
			} else {
				$scope.timer.script[$scope.activeScript].value = newValue;
				// Handle countdowns (add one second bias for voice) {{{
				if ($scope.user.settings.tts.countdown && $scope.timer.script[$scope.activeScript].value <= 1000) {
					console.log('Done');
				} else if ($scope.user.settings.tts.countdown && $scope.timer.script[$scope.activeScript].value <= 2000) {
					$scope.say(1);
				} else if ($scope.user.settings.tts.countdown && $scope.timer.script[$scope.activeScript].value <= 3000) {
					$scope.say(2);
				} else if ($scope.user.settings.tts.countdown && $scope.timer.script[$scope.activeScript].value <= 4000) {
					$scope.say(3);
				}
				// }}}
			}
			$scope.timer.script[$scope.activeScript].valueFormatted = $filter('formatTimer')($scope.timer.script[$scope.activeScript].value);
			$scope.refreshTotal()
			setTimeout($scope.timerTick, 1000);
		});
	};
});
