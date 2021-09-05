const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class WYR extends Command {
	constructor(bot) {
		super(bot, {
			name: 'wyr',
			dirname: __dirname,
			aliases: ['wyr'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Would you rather',
			usage: 'wyr',
			cooldown: 1000,
		});
	}

	async execute(bot, message) {
		const replies = require('../../assets/json/wouldYouRather.json');

		const reply = replies[Math.floor(Math.random() * replies.length)];

		const embed = new MessageEmbed(message)
			.setTitle('Would you rather?' + 'qsdklhqlksdsh')
			.setDescription(`**${reply}**`);

		message.channel.send({ embeds: [embed] });
	}

};