var async = require('async');
var gulp = require('gulp');
var gutil = require('gulp-util');
var colors = require('colors');
var plugins = require('gulp-load-plugins')();

var paths = {
	scripts: [
		'public/js/**/*.js',
		'app/**/*.js'
	],
	data: [
		'models/data/**/*.js'
	],
	build: 'build'
};

/**
* Generic build-all script
*/
gulp.task('build', ['scripts']);

/**
* Compile all JS files into the build directory
*/
gulp.task('scripts', ['clean'], function() {
	return gulp.src(paths.scripts)
		// .pipe(plugins.uglify())
		.pipe(plugins.concatSourcemap('all.min.js'))
		.pipe(gulp.dest(paths.build));
});

/**
* Clean the build directory
*/
gulp.task('clean', function(cb) {
	return gulp.src(paths.build)
		.pipe(plugins.rimraf());
});

/**
* Lint all JS files
*/
gulp.task('lint', function () {
	gulp.src(paths.scripts)
		.pipe(plugins.jshint());
})

/**
* Setup the local Mongo DB with all the files located in paths.data
*/
gulp.task('db', function() {
	gulp.src(paths.data, {read: false})
		.pipe(plugins.shell('node <%=file.path%>'));
});

/**
* Output the current environment config
*/
gulp.task('config', function() {
	var config = require('./config/global');
	gutil.log(config);
});

/**
* Launch a server and watch the local file system for changes (restarting the server if any are detected)
*/
gulp.task('default', ['scripts'], function () {
	plugins.nodemon({script: 'server.js', ext: 'html js ejs'})
		.on('change', ['scripts'])
		.on('restart', function () {
			gutil.log('Restarted!'.red)
		});
});

// Debug kit {{{
gulp.task('dbtest', function(next) {
	global.config = require('./config/global');
	gutil.log('Opening DB connection...');
	require('./config/db');
	gutil.log('Testing User query...');
	var users = require('./models/users');
	users.find({}, function(err, data) {
		if (err) {
			gutil('Got error', err.red);
		} else {
			gutil.log('Got data', data);
		}
		next(err);
	});
});
// }}}

// OpenShift functionality {{{
/**
* Push a local database to a remote OpenShift MongoDB instance
* Requires config/openshift.js to be present and populated to get all OpenShift info
* Requires `rhc` to be installed
*/
gulp.task('osdbpush', function() {
	process.env.NODE_ENV = 'openshift';
	var config = require('./config/global');

	var spawn = require('child_process').spawn;
	var exec = require('child_process').exec;
	var tunnel;

	async.series([
		function(next) {
			gutil.log('Setting up connection to OpenShift...');
			tunnel = spawn('rhc', ['port-forward', '--config', config.openshift.configFile, '-a', config.openshift.project]);
			tunnel.stdout.setEncoding('utf8');
			tunnel.stdout.on('data', function(data) {
				gutil.log('Child process responded:', data);
				if (/^done/.exec(data)) // Tunnel setup correctly
					return next(null);
			});
			tunnel.stderr.setEncoding('utf8');
			tunnel.stderr.on('data', function(data) {
				gutil.log('Child process err:', data);
			});
			tunnel.on('close', function(code) {
				if (code != 0)
					return next('Port forwarder exited with code', code);
			});
		},
		function(next) {
			gutil.log('Connected to OpenShift with port forwarding');
			gutil.log('Dumping local database...');
			exec('mongodump -d ' + config.mongo.name + ' -o ' + config.openshift.mongo.tempFolder, function(err, stdout, stderr) {
				if (stdout)
					gutil.log('Child process responded:', stdout);
				if (stderr)
					gutil.log('Child process err:', stderr);
				return next(err);
			});
		},
		function(next) {
			gutil.log('Uploading database to OpenShift...');
			exec('mongorestore -d ' + config.mongo.name + ' -h localhost --port ' + config.openshift.mongo.remotePort + ' --username ' + config.openshift.mongo.username + ' --password ' + config.openshift.mongo.password + ' ' + config.openshift.mongo.tempFolder + '/' + config.mongo.name, function(err, stdout, stderr) {
				if (stdout)
					gutil.log('Child process responded:', stdout);
				if (stderr)
					gutil.log('Child process err:', stderr);
				return next(err);
			});
		},
		function(next) {
			gutil.log('Closing tunnel...');
			tunnel.kill();
			return next();
		},
		function(next) {
			gutil.log('Cleaning up...');
			exec('rm -r "' + config.openshift.mongo.tempFolder + '"', function(err, stdout, stderr) {
				if (stdout)
					gutil.log('Child process responded:', stdout);
				if (stderr)
					gutil.log('Child process err:', stderr);
				return next(err);
			});
		}
	]);
});

/**
* Connect to a remote OpenShift instance and tail its console output
* Requires config/openshift.js to be present and populated to get all OpenShift info
* Requires `rhc` to be installed
*/
gulp.task('ostail', function() {
	process.env.NODE_ENV = 'openshift';
	var config = require('./config/global');

	var spawn = require('child_process').spawn;
	var tailer = spawn('rhc', ['tail', '--config', config.openshift.configFile, '-a', config.openshift.project]);
	tailer.stdout.setEncoding('utf8');
	tailer.stdout.on('data', function(data) {
		gutil.log(data);
	});
	tailer.stderr.setEncoding('utf8');
	tailer.stderr.on('data', function(data) {
		gutil.log(data.red);
	});
});

/**
* Restart this OpenShift instance
* Requires config/openshift.js to be present and populated to get all OpenShift info
* Requires `rhc` to be installed
*/
gulp.task('osrestart', function() {
	process.env.NODE_ENV = 'openshift';
	var config = require('./config/global');

	var spawn = require('child_process').spawn;
	var tailer = spawn('rhc', ['app', 'restart', '--config', config.openshift.configFile, '-a', config.openshift.project]);
	tailer.stdout.setEncoding('utf8');
	tailer.stdout.on('data', function(data) {
		gutil.log(data);
	});
	tailer.stderr.setEncoding('utf8');
	tailer.stderr.on('data', function(data) {
		gutil.log(data.red);
	});
});
// }}}
