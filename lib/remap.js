'use strict';

let reqParams = function(req) {
	return {
		id: req.params.identifier,
		zoneId: req.params.zone_identifier,
	};
};

module.exports = {
	reqParams: reqParams,
};
