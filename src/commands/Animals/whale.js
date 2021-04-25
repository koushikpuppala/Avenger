const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Whale extends Command {
	constructor(bot) {
		super(bot, {
			name: 'whale',
			dirname: __dirname,
			aliases: ['whale'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a whale',
			usage: 'whale',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('https://some-random-api.ml/img/whale').then((res) =>
			res.json(),
		);

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.link})`)
			.setImage(`${data.link}`);

		message.channel.send(embed);
	}
};
