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
	log.debug({req: req}, 'received request');
	let error = validate.reqParams(req, 'cannot update record - missing required parameters');

	if (error !== '') {
		res.status(403).json(error);
	} else {
		try {
			await Records.findOneAndUpdate({

				id: req.params.identifier,
				zone_id: req.params.zone_identifier,
			}, {
				$set: {
					'content': req.body.content,
					'name': req.body.name,
					'proxied': req.body.proxied,
					'ttl': req.body.ttl,
					'type': req.body.type,
				},
			});
			log.info('record created');
			res.status(200).json({
				result: 'success',
				message: 'Record updated',
				info: {
					content: req.body.content,
					name: req.body.name,
					proxied: req.body.proxied,
					ttl: req.body.ttl,
					type: req.body.type,
				},
			});
		} catch (error) {
			log.error({error: error}, 'Error updating a record');
			res.status(500).json({
				result: 'error',
				message: 'Cannot update record',
				info: {
					error: error,
				},
			});
		}
	}
};
