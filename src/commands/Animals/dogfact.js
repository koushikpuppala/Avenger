const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Dogfact extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dogfact',
			dirname: __dirname,
			aliases: ['dogfact'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a dog fact',
			usage: 'dogfact',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		fetch('https://some-random-api.ml/facts/dog')
			.then((res) => res.json())
			.then((data) => {
				const fact = data.fact;

				const embed = new MessageEmbed(message)
					.setTitle('DOG FACT')
					.setDescription(fact);
				message.channel.send(embed);
			});
	}
};
