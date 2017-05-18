'use strict';

import CfRecords from '../../lib/cloudflarerecords';

export const route = {
	method: 'get',
	path: '/cf/zones/:zone_identifier/dns_records',
	type: 'json',
};

export default async(req, res) => {
	log.debug({req: req}, 'received request');

	let zone = req.params.zone_identifier;

	try {
		return CfRecords.getRecords(zone);
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
