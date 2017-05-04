/**
 * Model Schema
 */
const Records = require('../../models/records');

export const route = {
	method: 'delete',
	path: '/zones/:zone_identifier/dns_records/:identifier',
	type: 'json',
};

async function deleteRecord(req) {
	let data = req.body || {};

	data.zoneId = req.params.zone_identifier;
	data.id = req.params.identifier;

	Records.findOneAndRemove({
		id: data.id,
		zoneId: data.zoneId,
	}).exec();
	return data;
}

export default async(req, res) => {
	log.debug({req: req}, 'DELETE received for %s record on zone %s', req.params.identifier, req.params.zone_identifier);

	deleteRecord(req)
		.then(function(record) {
			let generatedRecord = cloudflare.DNSRecord.create(record);

			cf.deleteDNS(generatedRecord);

			log.info('Record %s was deleted', generatedRecord.id);
			res.status(200).json({
				result: 'Record deleted',
				info: {
					'id': generatedRecord.id,
				},
			});
		});
};
