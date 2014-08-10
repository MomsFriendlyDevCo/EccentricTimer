module.exports = {
	host: process.env.OPENSHIFT_NODEJS_IP,
	port: process.env.OPENSHIFT_NODEJS_PORT,
	url: 'http://eccentrictimer-mfdc.rhcloud.com',
	openshift: {
		project: 'eccentrictimer',
		configFile: '~/.openshift/express.conf'
	},
};
