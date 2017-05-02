'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var config = require('./config'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api');

exports.default = function (app, magnet) {};