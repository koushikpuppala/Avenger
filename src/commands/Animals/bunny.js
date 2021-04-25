const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Bunny extends Command {
	constructor(bot) {
		super(bot, {
			name: 'bunny',
			dirname: __dirname,
			aliases: ['bunny'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a bunny',
			usage: 'bunny',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://api.bunnies.io/v2/loop/random/?media=gif,png',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setDescription(
				`[CLICK_TO_VIEW](${data.media.gif})`,
			)
			.setImage(`${data.media.gif}`);

		message.channel.send(embed);
	}
};
