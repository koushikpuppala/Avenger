const Command = require('../../structures/Command.js');

module.exports = class RandomNumber extends Command {
	constructor(bot) {
		super(bot, {
			name: 'randomnumber',
			dirname: __dirname,
			aliases: ['number'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a random 6 digit number',
			usage: 'randomnumber',
			cooldown: 1000,
		});
	}
	execute(bot, message) {
		const n = Math.floor(Math.random() * 1000000) + 1;

		message.channel.send(n);
	}

};