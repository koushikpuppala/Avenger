const cowsay = require('cowsay'),
	Command = require('../../structures/Command.js');

module.exports = class Cowsay extends Command {
	constructor(bot) {
		super(bot, {
			name: 'cowsay',
			dirname: __dirname,
			aliases: ['cowsay'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Let a cow say something',
			usage: 'cowsay',
			cooldown: 1000,
		});
	}
	async run(bot, message, settings) {
		const text = message.args.join(' ');

		if (!text) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}

		message.channel.send(
			`\`\`\` ${cowsay.say({ text, T: 'U', e: 'oO' })} \`\`\``,
		);
	}
};
