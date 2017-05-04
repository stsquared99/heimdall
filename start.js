import bunyan from 'bunyan';
import mongoose from 'mongoose';
import cloudflare from 'cloudflare';

const cloudflareConfig = require('./cloudflare.config');
const config = require('./config');
const magnetConfig = require('./magnet.config.js');

global.cf = new cloudflare({
	'email': cloudflareConfig.email,
	'key': cloudflareConfig.apiKey,
});

global.cloudflare = require('cloudflare');

global.log = bunyan.createLogger({'name': config.name, 'level': 'info'});

global.Records = require('./models/records')


mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri);

export default (app, magnet) => {
	log.info('Running on port %s', magnetConfig.magnet.port);
};
