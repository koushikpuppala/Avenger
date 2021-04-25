const { Schema, model } = require('mongoose');

const StaffApplicationSchema = Schema({
	UserName: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	DiscordId: {
		type: String,
		required: true,
		unique: true,
	},
	Name: {
		type: String,
		required: true,
	},
	Abilities: {
		type: String,
		required: true,
	},
	ReasonToPickYou: {
		type: String,
		required: true,
	},
	ReasonToBeStaff: {
		type: String,
		required: true,
	},
	HelpingHands: {
		type: String,
		required: true,
	},
	AboutYou: {
		type: String,
		required: true,
	},
	TimeZone: {
		type: String,
		required: true,
	},
	Country: {
		type: String,
		required: true,
	},
	Languages: {
		type: String,
		required: true,
	},
	WorkingHours: {
		type: String,
		required: true,
	},
	Spamming: {
		type: String,
		required: true,
	},
	Age: {
		type: String,
		required: true,
	},
	Gender: {
		type: String,
		required: true,
	},
	StaffWorked: {
		type: String,
		required: true,
		default: 'No',
	},
	AbusingPermissions: {
		type: String,
		required: true,
	},
	TermsAndConditions: {
		type: String,
		required: true,
	},
	VerifiedUser: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = model('StaffApplication', StaffApplicationSchema);