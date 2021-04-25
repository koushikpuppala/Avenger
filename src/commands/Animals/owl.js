const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Owl extends Command {
	constructor(bot) {
		super(bot, {
			name: 'owl',
			dirname: __dirname,
			aliases: ['owl'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a owl',
			usage: 'owl',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('http://pics.floofybot.moe/owl').then((res) =>
			res.json(),
		);

		const embed = new MessageEmbed(message)
			.setDescription(
				`[CLICK_TO_VIEW](${data.image})`,
			)
			.setImage(`${data.image}`);

		message.channel.send(embed);
	}
};
