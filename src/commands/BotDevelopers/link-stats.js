/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	LinkSchema = require('../../database/models');

module.exports = class LinkStats extends Command {
	constructor(bot) {
		super(bot, {
			'name': 'linkstats',
			dirname: __dirname,
			aliases: ['ls'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Send All link you added in this bot for hosting',
			usage: 'stats',
			cooldown: 2000,
		});
	}

	async run(bot, message) {

		if (message.channel.id != bot.config.SupportServer.HostChannel) {
			message.channel.send(new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('This command only work on my support server.')
				.addField('Support Server', `Join my [Support server](${bot.config.SupportServer.link}) to use this command`)
				.addField('Host Channel', `If you are in Support server then go to channel <#${bot.config.SupportServer.HostChannel}>`)
				.addField('Role', `If you are unable to see channel <#${bot.config.SupportServer.HostChannel}> then go to channel <#791571731721617438> and take the role <@&831846178609430528>`)
				.setTimestamp(),
			).then(m => m.delete({ timeout: 30000 }));
		} else {

			const data = await LinkSchema.find({
				userID: message.author.id,
			});

			if (!data) return message.channel.send(`You do not have any site to monitor, use ${bot.config.defaultSettings.prefix}addlink too add a website`);

			const embed = new MessageEmbed()
				.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setAuthor(`You have ${data.links.length} Website`)
				.setColor('GREEN')
				.setDescription(
					`**<a:tick:818394472563605554> ${data.links.join('\n\n<a:tick:818394472563605554> ')}**`,
				)
				.setTimestamp();

			message.reply('Check your Dm :)').then(m => m.delete({ timeout: 5000 }));

			message.author.send(embed).catch(err => {
				return message.channel.send(
					'Your dms are disabled so, please enable to get stats and try again',
				).then(m => m.delete({ timeout: 60000 }));
			});

		}
	}
};