const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Cat extends Command {
	constructor(bot) {
		super(bot, {
			name: 'cat',
			dirname: __dirname,
			aliases: ['cat'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a cat',
			usage: 'cat',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('https://nekos.life/api/v2/img/meow').then((res) =>
			res.json(),
		);

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.url})`)
			.setImage(`${data.url}`);

		message.channel.send(embed);
	}
};
