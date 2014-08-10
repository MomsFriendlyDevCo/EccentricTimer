app.run(function($rootScope) {
	$rootScope.timers = [
		{
			id: 'tennisElbow',
			title: 'Tennis Elbow',
			script: [
				{
					title: 'Preperation',
					time: 10 * 1000,
				},
				{
					title: 'Right arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Right arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Right arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Right arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
				},
				{
					title: 'Left arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Left arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Left arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Rest',
					time: 60 * 1000,
				},
				{
					title: 'Left arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Finish',
					time: 10 * 1000,
				}
			]
		}
	];
});
