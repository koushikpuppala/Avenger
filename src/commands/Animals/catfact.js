const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Catfact extends Command {
	constructor(bot) {
		super(bot, {
			name: 'catfact',
			dirname: __dirname,
			aliases: ['catfact'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a cat fact',
			usage: 'catfact',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		fetch('https://some-random-api.ml/facts/cat')
			.then((res) => res.json())
			.then((data) => {
				const fact = data.fact;

				const embed = new MessageEmbed(message).setTitle('CAT FACT').setDescription(fact);
				message.channel.send(embed);
			});
	}
};
