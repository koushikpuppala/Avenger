const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js');

module.exports = class Alpaca extends Command {
	constructor(bot) {
		super(bot, {
			name: 'alpaca',
			dirname: __dirname,
			aliases: ['alpaca'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a alpaca',
			usage: 'alpaca',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		randomGen.alpaca(message, 'message');
	}
};
