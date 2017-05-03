import bunyan from 'bunyan';
import mongoose from 'mongoose';

const config = require('./config');


global.log = bunyan.createLogger({'name': config.name, 'level': 'info'});

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri);

export default (app, magnet) => {};
