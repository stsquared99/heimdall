'use strict';

import parseCloudflare from './parsecloudflare';

export const route = {
	method: 'get',
	path: '/zones/:zone_identifier/sync',
	type: 'json',
};

function listCloudflareRecords(zone) {
	return cf.browseDNS(zone, {page: 1, per_page: 50})
			.then(function (result) {
			let promises = [Promise.resolve(result)];
			for (let i = 2; i <= result.totalPages; i++) {
				promises.push(client.browseDNS(zone, {page: i, per_page: 50}));
			}
			return Promise.all(promises);
		});
}


async function getCloudflareRecordsClean(zoneId) {
	log.info('RECONCILING zone: %s', zoneId);

	let records = await listCloudflareRecords(zoneId);

	let cloudflareRecords = new Array();

	records[0].result.forEach(async function(entry) {
		let entryClean = await parseCloudflare.cleanRecords(entry);
		cloudflareRecords.push(entryClean);
	});

	return cloudflareRecords;
}

async function getMongoRecords(zoneId) {
	let recordsList = Records.find({
		zoneId: zoneId,
	}).exec();

	return recordsList;
}

async function cleanMongoRecords(array) {
	let cleaned = new Array();

	let arrayJson = JSON.stringify(array);

	array.forEach(async function(record) {
		console.log(record._id);
		await delete record._id;
		await delete record.__v;
 //MAKE THIS ASYNC
		cleaned.push(record);
	});

	return cleaned;
}

export default async(req, res) => {
	log.info('RECONCILING zone: %s', req.params.zone_identifier);

	let cfRecords = await getCloudflareRecordsClean(req.params.zone_identifier);

	let mongoRecords = await getMongoRecords(req.params.zone_identifier);
	
	let mongoRecordsClean = await cleanMongoRecords(mongoRecords);

	let response = {}
	response.cf = new Array();
	response.mongo = new Array();

	return mongoRecordsClean;
	// await response.mongo.push(mongoRecordsClean);
	// await response.cf.push(cfRecords);

	// return response;
};