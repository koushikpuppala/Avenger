module.exports = (bot) => {
	DiscordStrategy = require('./DiscordStrategy')(bot),
	Guild = require('./Guild'),
	User = require('./User'),
	Message = require('./Message'),
	TextChannel = require('./TextChannel'),
	DMChannel = require('./DMChannel')
};
