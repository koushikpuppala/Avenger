const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
	UserName: {
		type: String,
		required: true,
	},
	DiscordID: {
		type: String,
		required: true,
	},
	ReportSubject: {
		type: String,
		required: true,
	},
	ReportMessage: {
		type: String,
		required: true,
	},
});

module.exports = model('Report', ReportSchema);
