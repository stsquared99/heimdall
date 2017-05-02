/**
 * Model Schema
 */
const Records = require('./models/records')


function keyNamer(data) {
        data._name = data.name;
        delete data.name;

        data._type = data.type;
        delete data.type;

        return data;
}

export const route = {
	  method: 'post',
	    path: '/zones/:zone_identifier/dns_records',
	      type: 'json',
};

export default async (req, res) => {
	if (!req.body.hasOwnProperty('content') || !req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('type')) {
		return {error: '404'};
  } else {
		let data = keyNamer(req.body || {})
		data.zone_id = req.params.zone_identifier;
		let record = new Records(data)

		record.save()

		return res.send(200, 'OK')
	}


};