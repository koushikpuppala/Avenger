const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Racoon extends Command {
	constructor(bot) {
		super(bot, {
			name: 'racoon',
			dirname: __dirname,
			aliases: ['racoon'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a racoon',
			usage: 'racoon',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch('https://some-random-api.ml/img/racoon').then((res) =>
			res.json(),
		);

		const embed = new MessageEmbed(message)
			.setDescription(`[CLICK_TO_VIEW](${data.link})`)
			.setImage(`${data.link}`);

		message.channel.send(embed);
	}
};
