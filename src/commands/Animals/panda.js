const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Panda extends Command {
	constructor(bot) {
		super(bot, {
			name: 'panda',
			dirname: __dirname,
			aliases: ['panda'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a panda',
			usage: 'panda',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://some-random-api.ml/img/panda',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.link})`)
			.setImage(`${data.link}`);

		message.channel.send(embed);
	}
};
