/**
 * Model Schema
 */
const Records = require('../../models/records');

export const route = {
	method: 'delete',
	path: '/zones/:zone_identifier/dns_records/:identifier',
	type: 'json',
};

export default async(req, res) => {
	log.debug({req: req}, 'DELETE received for %s record on zone %s', req.params.identifier, req.params.zone_identifier);
	try {
		await Records.findOneAndRemove({
			id: req.params.identifier,
			zone_id: req.params.zone_identifier,
		}).exec();

		log.info('Record %s was deleted from zone %s', req.params.identifier, req.params.zone_identifier)
		res.status(200).json({
			result: 'Record deleted',
			info: {
				id: id,
			},
		});
	} catch (error) {
		log.error({error: error}, 'An error occurred while listing records');
		res.status(500).json({
			result: 'error',
			message: 'An unknown error occurred',
			info: {
				error: error,
			},
		});
	}
};
