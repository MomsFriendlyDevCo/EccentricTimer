app.run(function($rootScope) {
	$rootScope.user = {
		settings: {
			tts: {
				enabled: true,
				countdown: true,
				voice: 0
			}
		}
	};

	$rootScope.timers = [
		{
			id: 'tennisElbow',
			title: 'Tennis Elbow',
			script: [
				{
					title: 'Preperation',
					time: 5 * 1000,
				},
				{
					title: 'Right arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Finished',
					time: 3 * 1000,
					say: true
				}
			]
		}
	];
});
