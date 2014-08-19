var _ = require('lodash');
var fs = require('fs');
var async = require('async');
var gulp = require('gulp');
var gutil = require('gulp-util');
var colors = require('colors');
var plugins = require('gulp-load-plugins')();
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

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

// Useful functions {{{
/**
* Wrapper function to quickly include an external run inside Gulp
* Can include options.ignoreFail which always triggers a success event on finish
* @param string command The command to run
* @param object options Options object
* @param function next Callback(err) to call on finish
*/
function run(command, options, next) {
	var exec = require('child_process').exec;
	exec(command, options, function(err, stdout, stderr) {
		if (stdout)
			gutil.log('Child process responded:', stdout);
		if (stderr)
			gutil.log('Child process err:', stderr);
		return next(options.ignoreFail ? null : err);
	});
}
// }}}

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
	// Dummy function - we dont want to keep deleting the build dir each time for no real reason
	// Uncomment the below if you do
	/* return gulp.src(paths.build)
		.pipe(plugins.rimraf()); */
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


gulp.task('bump', function(){
	gulp.src('./package.json')
		.pipe(plugins.bump({type: 'patch'})) // Types: major|minor|patch|prerelease
		.pipe(gulp.dest('./'));
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

// Phonegap Functionality {{{
gulp.task('pgbuild', ['scripts'], function() {
	var config = require('./config/global');
	// Download localhost -> build/phonegap/index.html
	// Apply s/href="\//href=\"/g on build/phonegap/index.html (make all links relative)

	var exec = require('child_process').exec;
	var spawn = require('child_process').spawn;

	async.series([
		function(next) {
			gutil.log('Making directory structure for PhoneGap...');
			mkdirp('build/phonegap/build', next);
		},
		function(next) {
			gutil.log('Copying Angular files...');
			gulp.src(['app/**/'])
				.pipe(gulp.dest('build/phonegap/app'));
			next();
		},
		function(next) {
			gutil.log('Copying view files...');
			gulp.src(['views/templates/**/'])
				.pipe(gulp.dest('build/phonegap/templates'));
			next();
		},
		function(next) {
			// Bulid + template the config.xml file from the projects config
			gutil.log('Building PhoneGap config.xml file...');
			fs.readFile('config.xml', function(err, data) {
				var outConfigXML = _.template(data, config);
				fs.writeFile('build/phonegap/config.xml', outConfigXML, next);
			});
		},
		function(next) {
			gutil.log('Downloading main site page...');

			run('wget -q -r --no-host-directories "' + config.url + '"', {cwd: 'build/phonegap', ignoreFail: true}, next);
		},
		function(next) {
			gutil.log('Rewriting all links in HTML files...');
			run("find -iname '*.html' -print0 | xargs -0 perl -pi -e 's!(href|src)=\"\/!\\1=\"!g'", {cwd: 'build/phonegap'}, next);
		},
		function(next) {
			gutil.log('Compressing into ZIP...');
			run("zip -qr ../phonegap.zip *", {cwd: 'build/phonegap'}, next);
		},
		function(next) {
			gutil.log('Cleaning up...');
			rimraf('build/phonegap', next);
		}
	]);
});
// }}}
