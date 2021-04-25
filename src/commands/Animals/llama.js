const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js');

module.exports = class Llama extends Command {
	constructor(bot) {
		super(bot, {
			name: 'llama',
			dirname: __dirname,
			aliases: ['llama'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a llama',
			usage: 'llama',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		randomGen.lama(message, 'message');
	}
};
