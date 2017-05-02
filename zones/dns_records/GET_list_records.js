/**
 * Model Schema
 */
const Records = require('../../models/records');

export const route = {
	method: 'get',
	path: '/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req) => {
	try {
		let recordsList = Records.find({
			zone_id: req.params.zone_identifier
		}).exec();
		return recordsList
	} catch (error) {
		res.status(404).json({
			result: 'error',
			message: 'cannot list records',
			info: {
				error: error
			}
		});
	};
}