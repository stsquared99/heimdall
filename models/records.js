'use strict'

const mongoose = require('mongoose'),
	mongooseApiQuery = require('mongoose-api-query'),
	Schema = mongoose.Schema;

const RecordsSchema = new Schema({
	type: {
		type: String,
		required: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	id: {
		type: String,
	},
	proxied: {
		type: Boolean,
		default: false
	},
	proxiable: {
		type: Boolean,
	},
	ttl: {
		type: Number,
		default: 1
	},
	zone_id: {
		type: String,
		required: true,
	},
	zone_name: {
		type: String,
	},
}, {
	minimize: false
});


RecordsSchema.plugin(mongooseApiQuery)

var Records = mongoose.model('Records', RecordsSchema);

module.exports = Records;