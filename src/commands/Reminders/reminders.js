const { timeEventSchema } = require('../../database/models'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Reminders extends Command {
	constructor(bot) {
		super(bot, {
			name: 'reminders',
			dirname: __dirname,
			aliases: ['reminderlist'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'All your active reminders',
			usage: 'reminders',
			cooldown: 1000,
			examples: 'reminders',
		});
	}

	// Run command
	async run(bot, message) {
		const member = this.getMemberFromMention(message, message.args) || message.guild.members.cache.get(message.args);
		const user = await timeEventSchema.findOne({
			userID: message.author.id,
			guildID: message.guild.id,
		});

		if (!user.reminder.hasReminder) {
			return message.channel.send(
				'user doesn\'t have any active reminders',
			);
		}

		const mappedReminders = user.reminder.reminders.map((reminder) => {
			return `**Message:** ${reminder.msg}\n**Time:** ${reminder.time}\n**Id:** ${reminder.id}`;
		});

		const embed = new MessageEmbed(message)
			.setTitle(`${member.user.username}'s active reminders`)
			.setDescription(mappedReminders.join('\n\n'));

		return message.channel.send(embed);
	}
};
