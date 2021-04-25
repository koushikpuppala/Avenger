// Dependencies
const Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Announcement extends Command {
	constructor(bot) {
		super(bot, {
			name: 'announcement',
			dirname: __dirname,
			aliases: ['announce', 'news', 'announcement'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get bot related announcements.',
			usage: 'announcement',
			cooldown: 2000,
		});
	}

	// Run command
	async run(bot, message, settings) {
		const guild = bot.guilds.cache.get(bot.config.SupportServer.GuildID);
		const channel = guild.channels.cache.get(bot.config.SupportServer.AnnouncementChannel);
		const messages = await channel.messages.fetch({ limit: 1 });
		const announcement = messages.first();

		const embed = new MessageEmbed()
			.setTitle('Bot Announcement!')
			.setAuthor(announcement.author.username, announcement.author.displayAvatarURL({ size: 64 }))
			.setDescription(announcement.cleanContent)
			.setThumbnail(announcement.author.displayAvatarURL({ size: 512 }))
			.setTimestamp(new Date(announcement.createdTimestamp))
			.setFooter(`From Avenger (Use ${settings.prefix}support to join us)`);

		return message.channel.send({ embed });
	}

};