const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Dog extends Command {
	constructor(bot) {
		super(bot, {
			name: 'dog',
			dirname: __dirname,
			aliases: ['dog'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a dog',
			usage: 'dog',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://dog.ceo/api/breeds/image/random',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setDescription(
				`[CLICK_TO_VIEW](${data.message})`,
			)
			.setImage(`${data.message}`);

		message.channel.send(embed);
	}
};
