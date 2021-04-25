const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Shibe extends Command {
	constructor(bot) {
		super(bot, {
			name: 'shibe',
			dirname: __dirname,
			aliases: ['shibe'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a shibe',
			usage: 'shibe',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('http://shibe.online/api/shibes').then((res) =>
			res.json(),
		);

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data[0]})`)
			.setImage(`${data[0]}`);

		message.channel.send(embed);
	}
};
