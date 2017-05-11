'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
		unique: true
	},
	proxied: {
		type: Boolean,
		default: false,
	},
	proxiable: {
		type: Boolean,
	},
	ttl: {
		type: Number,
		default: 1,
	},
	zoneId: {
		type: String,
		required: true,
	},
	zoneName: {
		type: String,
	},
	locked: {
		type: Boolean,
	},
	createdOn: {
		type: String,
	},
	modifiedOn: {
		type: String,
	},
	priority: {
		type: Number,
	},
}, {
	minimize: false,
});

let Records = mongoose.model('Records', RecordsSchema);

module.exports = Records;
