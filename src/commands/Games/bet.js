// Dependencies
const Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Ascii extends Command {
	constructor(bot) {
		super(bot, {
			name: 'ascii',
			dirname: __dirname,
			aliases: ['ascii'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Transform text to ascii',
			usage: 'ascii <text>',
			cooldown: 1000,
		});
	}

	async run(bot, message, settings) {
		const member = this.getMemberFromMention(message, message.args);

		if (!member) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}

		const n = Math.random();

		const embed = new MessageEmbed(message)
			.setTitle(`${message.author.username} bets on ${member.user.username}`)
			.setDescription(
				n > 0.5
					? `${message.author.username} bet on ${member.user.username}!\n ${message.author.username} won the bet`
					: `${message.author.username} bet on ${member.user.username}!\n ${message.author.username} didn't win the bet`,
			);

		return message.channel.send(embed);
	}
};