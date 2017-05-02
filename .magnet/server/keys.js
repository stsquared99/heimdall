"use strict";

module.exports = {
	makeLocal: function makeLocal(data) {
		data._name = data.name;
		delete data.name;

		data._type = data.type;
		delete data.type;

		return data;
	}
};