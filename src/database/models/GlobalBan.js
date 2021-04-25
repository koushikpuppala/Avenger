const { Schema, model } = require('mongoose');

const globalBanSchema = Schema({
	userID: {
		type: String,
	},
	reason: {
		type: String,
	},
	IssueDate: {
		type: String,
	},
	restriction: {
		type: String,
	},
});

module.exports = model('GlobalBan', globalBanSchema);
