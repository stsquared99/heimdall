'use strict';

export const route = {
	method: 'patch',
	path: '/zones/:zone_identifier/init',
	type: 'json',
};


function listCloudflare(zone) {
	return cf.browseDNS(zone, {page: 1, per_page: 50})
			.then(function (result) {
			let promises = [Promise.resolve(result)];
			for (let i = 2; i <= result.totalPages; i++) {
				promises.push(client.browseDNS(zone, {page: i, per_page: 50}));
			}
			return Promise.all(promises);
		});
}


export default async(req, res) => {
	log.info('INITIALIZING zone: %s', req.params.zone_identifier);

	let zoneId = req.params.zone_identifier;
	let records = await listCloudflare(zoneId);

	records[0].result.forEach(function(entry) {
		delete entry.meta;

		let entryClean = {
			'name': entry.name,
			'content': entry.content,
			'type': entry.type,
			'proxied': entry.proxied,
			'zoneId': entry.zoneId,
			'zoneName': entry.zoneName,
			'ttl': entry.ttl,
			'id': entry.id,
		}

		log.info(entryClean);
		let record = new Records(entryClean);
		record.save();
	});

	res.status(200).json({
		result: 'success',
		message: 'Record updated',
	});
};
