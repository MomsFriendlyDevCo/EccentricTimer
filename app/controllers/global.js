// App global controller (also $rootScope)
app.controller('globalController', function($scope, $rootScope, $location, $timeout) {
	// TTS {{{
	$scope.hasTTS = false;
	$scope.say = function(text) {
		if (!$scope.user.settings.tts.enabled || !$scope.hasTTS)
			return;
		$scope.synthVoice.text = text;
		window.speechSynthesis.speak($scope.synthVoice);
	};
	$scope.loadVoices = function() {
		$scope.speaking = false;
		if ('speechSynthesis' in window) {
			$scope.hasTTS = true;
			$scope.synthVoice = new SpeechSynthesisUtterance();
			$scope.synthVoice.lang = 'en-US';
			$scope.voices = speechSynthesis.getVoices();
			speechSynthesis.speak($scope.synthVoice);
		}
	};
	$scope.$watch('user.settings.tts.voice', function() {
		if ($scope.hasTTS) {
			console.log('Voice Changed', $scope.user.settings.tts.voice);
			$scope.synthVoice.voice = speechSynthesis.getVoices()[$scope.user.settings.tts.voice];
		}
	});
	// }}}
});

// Load voice data when ready
window.speechSynthesis.onvoiceschanged = function() {
	angular.element($('#globalController')).scope().loadVoices();
};
