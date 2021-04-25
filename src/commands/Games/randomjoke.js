const Command = require('../../structures/Command.js'),
	joke = require('one-liner-joke').getRandomJoke;

module.exports = class RandomJoke extends Command {
	constructor(bot) {
		super(bot, {
			name: 'randomjoke',
			dirname: __dirname,
			aliases: ['joke'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a random joke',
			usage: 'randomjoke',
			cooldown: 1000,
		});
	}

	execute(bot, message) {
		message.channel.send(
			joke({ exclude_tags: ['dirty', 'racist', 'marriage', 'sex', 'death'] })
				.body,
		);
	}

};