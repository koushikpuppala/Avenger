const { Schema, model } = require('mongoose');

const PartnerSchema = Schema({
	UserName: {
		type: String,
		required: true,
	},
	DiscordId: {
		type: String,
		required: true,
	},
	Email: {
		type: String,
		required: true,
	},
	Name: {
		type: String,
		required: true,
	},
	GuildId: {
		type: String,
		required: true,
		unique: true,
	},
	TermsAndConditions: {
		type: String,
		required: true,
	},
	InviteLink: {
		type: String,
		required: true,
		unique: true,
	},
	Description: {
		type: String,
		required: true,
	},
	VanityURL: {
		type: String,
		required: true,
		unique: true,
	},
	AboutGuild: {
		type: String,
		required: true,
	},
	IsOwner: {
		type: String,
		required: true,
		default: 'No',
	},
	VerifiedServer: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = model('Partner', PartnerSchema);