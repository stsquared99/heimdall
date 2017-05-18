'use strict';

import CFRecords from './cloudflarerecords';
import MongoRecords from './mongorecords';
import Validate from './validate';
import lodash from 'lodash';

export const route = {
	method: 'get',
	path: '/zones/:zone_identifier/sync',
	type: 'json',
};

let reconcileRecords = function(cfRecords, mongoRecords) {
	let syncResults = [];
	syncResults.deleted = [];
	syncResults.added = [];
	syncResults.updated = [];

	let result = cfRecords.map((record) => {
		let mongoRecord = lodash.filter(mongoRecords, {id: record.id});
		if (mongoRecord == '' ) {
			syncResults.deleted.push(record);
			//CFRecords.deleteRecord(zoneId, record.id);
		} else if (Validate.recordIsEqual(record, mongoRecord[0]) == false) {
			syncResults.updated.push(record);
		} else if (Validate.recordIsEqual(record, mongoRecord[0]) == true) {
			console.log('record match');
		};
	});

	return Promise.all(result)
		.then(async function (record) {
			console.log(syncResults);
			return await syncResults;
		});
};

export default async(req, res) => {
	log.info('RECONCILING zone: %s', req.params.zone_identifier);

	let zoneId = req.params.zone_identifier;
	let cfRecords = await CFRecords.cleanRecords(zoneId);
	let mongoRecords = await MongoRecords.cleanRecords(zoneId);

	let response = await reconcileRecords(cfRecords, mongoRecords);
	return response;
};

