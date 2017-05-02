/**
 * Model Schema
 */
const Records = require('../../models/records');

export const route = {
	method: 'post',
	path: '/zones/:zone_identifier/dns_records/:identifier',
	type: 'json',
};

export default async(req, res) => {
	if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
		res.status(403).json({
			result: 'error',
			message: 'Cannot update record - missing required parameters',
			info: {
				content: req.body.content,
				id: id,
				name: req.body.name,
				type: req.body.type
			}
		});
	} else {
		try {
			await Records.findOneAndUpdate({

				id: req.params.identifier,
				zone_id: req.params.zone_identifier
			}, {
				$set: {
					"content": req.body.content,
					"name": req.body.name,
					"proxied": req.body.proxied,
					"ttl": req.body.ttl,
					"type": req.body.type
				}
			})
			res.status(200).json({
				result: 'success',
				message: 'Record updated',
				info: {
					content: req.body.content,
					name: req.body.name,
					proxied: req.body.proxied,
					ttl: req.body.ttl,
					type: req.body.type
				}
			});
		} catch (error) {
			res.status(500).json({
				result: 'error',
				message: 'Cannot update record',
				info: {
					error: error
				}
			});
		}
	}

};