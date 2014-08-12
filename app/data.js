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
		/*
		{
			id: String // Unique ID of this timer (used for URL slug)
			title: String // Human friendly name of the timer profile
			script: [ // Array of script items
				{
					title: String // The display title of the item
					time: Int // Time in seconds to display
					say: Bool|String // If true the title will be said via TTS, if a string it will be passed to TTS
				{
			]
		}
		*/

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
					say: true
				}
			]
		},
		{
			id: 'tennisElbowCompressed',
			title: 'Tennis Elbow (Alternating)',
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
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch arms',
					time: 10 * 1000,
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
					title: 'Left arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Finished',
					say: true
				}
			]
		}
	];
});
