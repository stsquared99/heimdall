'use strict';

export const route = {
	method: 'get',
	path: '/cf/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req, res) => {
	log.debug({req: req}, 'received request');

	let zone = req.params.zone_identifier;

	try {
		return cf.browseDNS(zone, {page: 1, per_page: 50})
			.then(function (result) {
			let promises = [Promise.resolve(result)];
			for (let i = 2; i <= result.totalPages; i++) {
				promises.push(client.browseDNS(zone, {page: i, per_page: 50}));
			}
			return Promise.all(promises);
		});
	} catch (error) {
		log.error({ error: error }, 'Error listing records');
		res.status(500).json({
			result: 'error',
			message: 'Cannot list records',
			info: {
				error: error,
			},
		});
	}
};
