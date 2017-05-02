/**
 * Model Schema
 */
const Records = require('./models/records')

export const route = {
	method: 'delete',
	path: '/zones/:zone_identifier/dns_records/:record_id',
	type: 'json',
};

export default async(req, res) => {
	try {
		await Records.findOneAndRemove({
			id: req.params.record_id,
			zone_id: req.params.zone_identifier
		}).exec();
			res.status(200).json({
				result: 'Record deleted',
				info: {
					id: id
				}
			});
	} catch (error) {
		res.status(500).json({
			result: 'error',
			message: 'An unknown error occurred',
			info: {
				error: error
			}
		});
	}
};