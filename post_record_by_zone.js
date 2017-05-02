const keys = require('./keys')

/**
 * Model Schema
 */
const Records = require('./models/records')


export const route = {
	method: 'post',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req, res) => {
	if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
		return {
			error: '404'
		};
	} else {
		let data = keys.makeLocal(req.body || {})
		data.zone_id = req.params.zone_identifier;
		let record = new Records(data)

		record.save()

		return res.send(200, 'OK')
	}


};