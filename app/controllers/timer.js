app.controller('timerController', function($scope, $rootScope, $routeParams, $location, $filter) {
	$scope.refresh = function() {
		$scope.timerEnabled = false;
		$scope.timer = _.find($rootScope.timers, {id: $routeParams.id});
		$scope.activeScript = 0;
		for (var s in $scope.timer.script) {
			$scope.timer.script[s].value = $scope.timer.script[s].time;
			$scope.timer.script[s].valueFormatted = $filter('formatTimer')($scope.timer.script[s].value);
		}
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
				if (++$scope.activeScript < $scope.timer.script.length) { // Still more scripts to go
					$scope.timer.script[$scope.activeScript].active = true;
				}
			} else {
				$scope.timer.script[$scope.activeScript].value = newValue;
			}
			$scope.timer.script[$scope.activeScript].valueFormatted = $filter('formatTimer')($scope.timer.script[$scope.activeScript].value);
			setTimeout($scope.timerTick, 1000);
		});
	};
});
