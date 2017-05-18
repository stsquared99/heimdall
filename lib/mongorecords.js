'use strict';

import Validate from './validate';

let cleanRecords = async function(zoneId) {
	let mongoRecords = await getRecords(zoneId);
	let mongoRecordsClean = [];

	mongoRecords.forEach(async function(record) {
		let recordClean = await Validate.cleanRecords(record);
		mongoRecordsClean.push(recordClean);
	});

	return mongoRecordsClean;
};

let getRecords = async function(zoneId) {
	let recordsList = await Records.find({
		zoneId: zoneId,
	}).exec();
	console.log(recordsList);
	return recordsList;
};

module.exports = {
	cleanRecords: cleanRecords,
	getRecords: getRecords,
};
