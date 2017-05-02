/**
 * Model Schema
 */
const Records = require('./models/records')

export const route = {
	method: 'get',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req) => Records.find({
	zone_id: req.params.zone_identifier
}).exec();