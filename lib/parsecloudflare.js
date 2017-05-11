'use strict';

let cleanRecords = function(entry) {
	delete entry.meta;

	let recordClean = {
		'name': entry.name,
		'content': entry.content,
		'type': entry.type,
		'proxied': entry.proxied,
		'zoneId': entry.zoneId,
		'zoneName': entry.zoneName,
		'ttl': entry.ttl,
		'id': entry.id,
	};
	return recordClean;
};

module.exports = {
	cleanRecords: cleanRecords,
};
