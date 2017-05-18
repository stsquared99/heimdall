'use strict';

import Validate from './validate';

let cleanRecords = async function(zoneId) {
	let records = await getRecords(zoneId);

	let cloudflareRecords = [];

	records[0].result.forEach(async function(entry) {
		let entryClean = await Validate.cleanRecords(entry);
		cloudflareRecords.push(entryClean);
	});

	return cloudflareRecords;
};

let getRecords = function(zoneId) {
	return cf.browseDNS(zoneId, {page: 1, per_page: 50})
			.then(function (result) {
			let promises = [Promise.resolve(result)];
			for (let i = 2; i <= result.totalPages; i++) {
				promises.push(client.browseDNS(zoneId, {page: i, per_page: 50}));
			}
			return Promise.all(promises);
		});
};

module.exports = {
	cleanRecords: cleanRecords,
	getRecords: getRecords,
};
