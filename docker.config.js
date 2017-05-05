'use strict';

let mongoPort = process.env.mongoPort || '27017';
let mongoIP = process.env.mongoIP || '127.0.0.1';
let mongoDbName = process.env.mongoDbName || 'heimdall';


module.exports = {
	db: {
		uri: 'mongodb://' + mongoIP + ':' + mongoPort + '/' + mongoDbName,
	},
	cfEmail: process.env.cfEmail,
	cfToken: process.env.cfToken,
};
