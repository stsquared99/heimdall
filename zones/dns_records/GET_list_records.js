/**
 * Model Schema
 */
const Records = require('../../models/records');

export const route = {
	method: 'get',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req, res) => {
	log.debug({req: req}, 'received request');
	try {
		let recordsList = Records.find({
			zoneId: req.params.zone_identifier,
		}).exec();
		log.info('The records were retrieved for zone: %s', req.params.zone_identifier);
		return recordsList;
	} catch (error) {
		log.error({error: error}, 'An error occurred while listing records');
		res.status(404).json({
			result: 'error',
			message: 'cannot list records',
			info: {
				error: error,
			},
		});
	};
};
