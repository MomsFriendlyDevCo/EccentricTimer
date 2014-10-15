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
			description: String // UNSUPPORTED Description of the routine
			routineTime: String // UNSUPPORTED Time the routine should be run for (e.g. '1 week')
			script: [ // Array of script items
				{
					title: String // The display title of the item
					time: Int // Time in seconds to display
					say: Bool|String // If true the title will be said via TTS, if a string it will be passed to TTS
					countdown: Bool // (Default: true), use TTS to announce the countdown
				{
			]
		}
		*/

		{
			id: 'tennisElbow',
			title: 'Tennis Elbow Session 1',
			description: 'Simple Tennis Elbow stretches with the aid of a rubber band. Designed to work with a arm at 90 degrees bend.',
			routineTime: '1 week',
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
					title: 'Switch to left arm',
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
					say: true,
					countdown: false
				}
			]
		},
		{
			id: 'tennisElbow1Compressed',
			title: 'Tennis Elbow Session 1 (Alternating)',
			description: 'Alternating Tennis Elbow stretches desgigned to reduce the time of the routine. Designed to work with a arm at 90 degrees bend.',
			routineTime: '1 week',
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
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #4',
					time: 60 * 1000,
				},
				{
					title: 'Finished',
					say: true,
					countdown: false
				}
			]
		},
		{
			id: 'tennisElbow2',
			title: 'Tennis Elbow Session 2',
			description: 'Straight arm based Tennis Elbow exsorsizes. Stretch arm in \'stopping motion\'.',
			routineTime: '10 days',
			script: [
				{
					title: 'Preperation',
					time: 5 * 1000,
				},
				{
					title: 'Right arm stress #1',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #1',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #2',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #2',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #3',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #3',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Right arm stress #4',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 10 * 1000,
					say: true
				},
				{
					title: 'Left arm stress #4',
					time: 45 * 1000,
				},
				{
					title: 'Finished',
					say: true,
					countdown: false
				}
			]
		},
		{
			id: 'tennisElbow3',
			title: 'Tennis Elbow Session 3 (60s)',
			description: '5kg Weight holding exorcizes, twice a day',
			routineTime: '14 days',
			script: [
				{
					title: 'Preperation',
					time: 5 * 1000,
				},
				{
					title: 'Right arm weights #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #4',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #4',
					time: 60 * 1000,
				},
				{
					title: 'Finished',
					say: true,
					countdown: false
				}
			]
		},
		{
			id: 'tennisElbow3-45s',
			title: 'Tennis Elbow Session 3 (45s)',
			description: '5kg Weight holding exorcizes, twice a day with lighter 45 second intervals',
			routineTime: '14 days',
			script: [
				{
					title: 'Preperation',
					time: 5 * 1000,
				},
				{
					title: 'Right arm weights #1',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #1',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #2',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #2',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #3',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #3',
					time: 45 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #4',
					time: 45 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #4',
					time: 45 * 1000,
				},
				{
					title: 'Finished',
					say: true,
					countdown: false
				}
			]
		},
		{
			id: 'tennisElbow3-60s',
			title: 'Tennis Elbow Session 3 (60s)',
			description: '5kg Weight holding exorcizes, twice a day with 60 second intervals',
			routineTime: '14 days',
			script: [
				{
					title: 'Preperation',
					time: 5 * 1000,
				},
				{
					title: 'Right arm weights #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #1',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #2',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #3',
					time: 60 * 1000,
				},
				{
					title: 'Switch to right arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Right arm weights #4',
					time: 60 * 1000,
				},
				{
					title: 'Switch to left arm',
					time: 5 * 1000,
					say: true
				},
				{
					title: 'Left arm weights #4',
					time: 60 * 1000,
				},
				{
					title: 'Finished',
					say: true,
					countdown: false
				}
			]
		}
	];
});
