const cowsPack = require('cows'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Cow extends Command {
	constructor(bot) {
		super(bot, {
			name: 'cow',
			dirname: __dirname,
			aliases: ['cow'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a cow ascii',
			usage: 'cow',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const cows = cowsPack();

		const cow = cows[Math.floor(Math.random() * cows.length)];

		const embed = new MessageEmbed(message)
			.setTitle('COW')
			.setDescription(`\`\`\`${cow}\`\`\``);

		message.channel.send(embed);
	}
};
