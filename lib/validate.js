'use strict';

let reqParams = function(req, message) {
	if (!req.body.hasOwnProperty('content')
	|| !req.body.hasOwnProperty('name')
	|| !req.body.hasOwnProperty('type')) {
		log.info('received request with missing parameters');
		return({
			result: 'error',
			message: message,
			info: {
				type: req.body.type || '{MISSING}',
				name: req.body.name || '{MISSING}',
				content: req.body.content || '{MISSING}',
			},
		});
	} else {
		return '';
	}
};

module.exports = {
	reqParams: reqParams,
};
