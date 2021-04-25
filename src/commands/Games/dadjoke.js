const fetch = require('node-fetch'),
	Command = require('../../structures/Command.js');

module.exports = class DadJoke extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dadjoke',
			dirname: __dirname,
			aliases: ['dadjoke'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a dadjoke',
			usage: 'dadjoke',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('https://icanhazdadjoke.com/slack').then((res) =>
			res.json(),
		);

		message.channel.send(data.attachments[0].fallback);
	}
};
