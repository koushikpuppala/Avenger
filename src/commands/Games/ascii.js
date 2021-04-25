// Dependencies
const Command = require('../../structures/Command.js'),
	figlet = require('figlet');

module.exports = class Ascii extends Command {
	constructor(bot) {
		super(bot, {
			name: 'ascii',
			dirname: __dirname,
			aliases: ['ascii'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Transform text to ascii',
			usage: 'ascii <text>',
			cooldown: 1000,
		});
	}

	async run(bot, message, settings) {
		const text = message.args.join(' ');

		if (!text) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		figlet.text(text, (e, txt) => {
			if (e) return;
			message.channel.send(`\`\`\` ${txt.trimRight()} \`\`\``);
		});
	}
};