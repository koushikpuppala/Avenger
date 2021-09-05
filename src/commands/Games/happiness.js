const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Happiness extends Command {
	constructor(bot) {
		super(bot, {
			name: 'happiness',
			dirname: __dirname,
			aliases: ['happiness'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get a happiness returned',
			usage: 'happiness',
			cooldown: 1000,
		});
	}
	async execute(bot, message) {
		const happiness = Math.floor(Math.random() * 100) + 1;

		const embed = new MessageEmbed(message)
			.setTitle('HAPPINESS')
			.setDescription(`${happiness}%`);

		message.channel.send({ embeds: [embed] });
	}
};
