const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Duck extends Command {
	constructor(bot) {
		super(bot, {
			name: 'duck',
			dirname: __dirname,
			aliases: ['duck'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a duck',
			usage: 'duck',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://random-d.uk/api/v1/random?type=gif',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.url})`)
			.setImage(`${data.url}`);

		message.channel.send(embed);
	}
};
