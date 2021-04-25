const { Schema, model } = require('mongoose');

const giveawaySchema = Schema({
	messageID: {
		type: String,
	},
	channelID: {
		type: String,
	},
	guildID: {
		type: String,
	},
	startAt: {
		type: Number,
	},
	endAt: {
		type: Number,
	},
	ended: {
		type: Boolean,
	},
	winnerCount: {
		type: Number,
	},
	winners: {
		type: Array,
	},
	prize: {
		type: String,
	},
	hostedBy: {
		type: String,
	},
	messages: Schema.Types.Mixed,
});

module.exports = model('Giveaway', giveawaySchema);
