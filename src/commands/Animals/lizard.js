const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Lizard extends Command {
	constructor(bot) {
		super(bot, {
			name: 'lizard',
			dirname: __dirname,
			aliases: ['lizard'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a lizard',
			usage: 'lizard',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://nekos.life/api/v2/img/lizard',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.url})`)
			.setImage(`${data.url}`);

		message.channel.send(embed);
	}
};
