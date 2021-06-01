const { Schema, model } = require('mongoose');

const linkSchema = Schema({
	userID: {
		type: String,
	},
	userName: {
		type: String,
	},
	links: {
		type: Array,
	}
});

module.exports = model('Link', linkSchema);