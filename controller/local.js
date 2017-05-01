/**
 * Model Schema
 */
const 	Records = require('../models/records')
		errors	= require('restify-errors')

function keyNamer(data) {
	data._name = data.name;
	delete data.name;

	data._type = data.type;
	delete data.type;

	return data;
}


function Controller() {
	that = this;

	that.list_dns_records = function(req, res, next) {
		Records.apiQuery({zone_id: req.params.zone_identifier}, function(err, records) {
			if (err) {
				log.error(err)
				return next(new errors.InvalidContentError(err.errors.name.message))
			}
			res.send(200)
			next()
		})
	};

	that.create_dns_record = function(req, res, next){
		if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
			res.send(500, 'Missing properties')
		} else {
			let data = keyNamer(req.body || {})



			// let record = new Records(data)
			// record.save(function(err) {
			// 	if (err) {
			// 		log.error(err)
			// 		return next(new errors.InternalError(err.message))
			// 		next()
			// 	}

				res.send(data)
				next()
//			})
		}
	}


};

module.exports = new Controller();