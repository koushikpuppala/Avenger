const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Bear extends Command {
	constructor(bot) {
		super(bot, {
			name: 'bear',
			dirname: __dirname,
			aliases: ['bear'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a bear',
			usage: 'bear',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://no-api-key.com/api/v1/animals/bear',
		).then((res) => res.json());

		const embed = new MessageEmbed(message)
			.setTitle(`${data.fact}`)
			.setDescription(`[CLICK_TO_VIEW](${data.image})`)
			.setImage(`${data.image}`);

		message.channel.send(embed);
	}
};
