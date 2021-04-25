const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js');

module.exports = class Camel extends Command {
	constructor(bot) {
		super(bot, {
			name: 'camel',
			dirname: __dirname,
			aliases: ['camel'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a camel',
			usage: 'camel',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		randomGen.camel(message, 'message');
	}
};
