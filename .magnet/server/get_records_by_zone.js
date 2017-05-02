'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Model Schema
 */
var Records = require('./models/records');

var route = exports.route = {
	method: 'get',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json'
};

exports.default = async function (req) {
	return Records.find({
		zone_id: req.params.zone_identifier
	}).exec();
};