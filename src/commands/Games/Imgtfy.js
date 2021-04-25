const Command = require('../../structures/Command.js');

module.exports = class Imgtfy extends Command {
	constructor(bot) {
		super(bot, {
			name: 'lmgtfy',
			dirname: __dirname,
			aliases: ['lmgtfy'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Let me google that for you',
			usage: 'lmgtfy <search query>',
			cooldown: 1000,
		});
	}
	async execute(bot, message, settings) {
		if (!message.args) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}
		const query = encodeURIComponent(message.args.join(' '));
		const url = `https://lmgtfy.com/?q=${query}&s=g`;

		message.channel.send(url);
	}
};
