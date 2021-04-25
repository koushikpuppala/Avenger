const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Fox extends Command {
	constructor(bot) {
		super(bot, {
			name: 'fox',
			dirname: __dirname,
			aliases: ['fox'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a fox',
			usage: 'fox',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('https://randomfox.ca/floof/').then((res) =>
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
