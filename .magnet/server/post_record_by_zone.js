'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var keys = require('./keys');

/**
 * Model Schema
 */
var Records = require('./models/records');

var route = exports.route = {
	method: 'post',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json'
};

exports.default = async function (req, res) {
	if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
		return {
			error: '404'
		};
	} else {
		var data = keys.makeLocal(req.body || {});
		data.zone_id = req.params.zone_identifier;
		var record = new Records(data);

		record.save();

		return res.send(200, 'OK');
	}
};