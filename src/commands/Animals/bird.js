const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Bird extends Command {
	constructor(bot) {
		super(bot, {
			name: 'bird',
			dirname: __dirname,
			aliases: ['bird'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a bird',
			usage: 'bird',
			cooldown: 1000,
		});
	}
	async execute(bot, message) {
		const data = await (
			await fetch('https://some-random-api.ml/img/birb')
		).json();

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.link})`)
			.setImage(`${data.link}`);

		message.channel.send(embed);
	}
};
