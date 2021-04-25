const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class IQ extends Command {
	constructor(bot) {
		super(bot, {
			name: 'iq',
			dirname: __dirname,
			aliases: ['iq'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get a random Iq returned',
			usage: 'iq',
			cooldown: 1000,
		});
	}
	async execute(bot, message) {
		const iq = Math.floor(Math.random() * 100) + 1;

		const embed = new MessageEmbed(message)
			.setTitle('IQ_TEST')
			.setDescription(`Your IQ is: ${iq}`);

		message.channel.send(embed);
	}
};
