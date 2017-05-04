import bunyan from 'bunyan';
import mongoose from 'mongoose';

const config = require('./config');

const magnetConfig = require('./magnet.config.js');

global.log = bunyan.createLogger({'name': config.name, 'level': 'info'});

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri);

export default (app, magnet) => {};
export default (app, magnet) => {
	log.info('Running on port %s', magnetConfig.magnet.port);
};
