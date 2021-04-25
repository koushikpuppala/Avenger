const fetch = require('node-fetch'),
	Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Compliment extends Command {
	constructor(bot) {
		super(bot, {
			name: 'compliment',
			dirname: __dirname,
			aliases: ['compliment'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get a compliment',
			usage: 'compliment',
			cooldown: 1000,
		});
	}
	async run(bot, message) {

		const { compliment } = await fetch(
			'https://complimentr.com/api',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setTitle('COMPLIMENT')
			.setDescription(compliment);

		message.channel.send(embed);
	}
};
