var _ = require('lodash');
var path = require('path');
var fs = require('fs');

// Determine 'ENV' {{{
var env = 'dev';
if (process.env.OPENSHIFT_NODEJS_IP) {
	env = 'openshift';
} else if (process.env.NODE_ENV) { // Inherit from NODE_ENV
	env = process.env.NODE_ENV;
}
// }}}

var defaults = {
	env: env,
	root: path.normalize(__dirname + '/..'),
	host: '127.0.0.1',
	port: process.env.PORT || 9000,
	url: 'http://localhost',
	package: require('../package.json'),
	phonegap: { // Store all this in private.js
		appId: '12345',
		username: 'nononono',
		password: 'nononono',
	}
};

module.exports = _.merge(
	defaults,
	fs.existsSync('./config/private.js') ? require('./private.js') : {},
	fs.existsSync('./config/' + defaults.env + '.js') ? require('./' + defaults.env + '.js') : {}
);
