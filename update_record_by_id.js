/**
 * Model Schema
 */
const Records = require('./models/records')


export const route = {
	method: 'post',
	path: '/zones/:zone_identifier/dns_records/:identifier',
	type: 'json',
};

export default async(req, res) => {
	if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
		return {
			error: '404'
		};
	} else {
		try {
			await Records.findOneAndUpdate({

					id: req.params.identifier,
					zone_id: req.params.zone_identifier
				}, {
					$set: {
						"name": req.body.name,
						"type": req.body.type,
						"content": req.body.content,
						"proxied": req.body.proxied,
						"ttl": req.body.ttl
					}
				})
		} catch (error) {
			res.status(500).json({
				error: 'Cannot update record'
			});
		}
	}


};