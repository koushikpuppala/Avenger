const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	discordId: {
		type: String,
		required: true,
		unique: true,
	},
	discordTag: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	guilds: {
		type: Array,
	},
	avatar: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = model('User', UserSchema);