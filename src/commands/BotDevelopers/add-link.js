const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	{ LinkSchema } = require('../../database/models');

module.exports = class AddLink extends Command {
	constructor(bot) {
		super(bot, {
			name: 'addlink',
			dirname: __dirname,
			aliases: ['al', 'monitor'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Add link to ping for hosting bot',
			usage: 'addlink <link>',
			cooldown: 2000,
		});
	}

	async run(bot, message, settings) {

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
			if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

			if (!this.isURL(message.args[0])) return message.channel.send('Given Url is invalid, Make sure you send working URL').then(m => m.delete({ timeout: 5000 }));

			const check = LinkSchema.findOne({
				userID: message.author.id,
			});

			if (check.count() > 0) {
				LinkSchema.findOneAndUpdate({
					userID: message.author.id,
				}, {
					$addToSet: {
						links: message.args[0],
					},
					$set: {
						userName: message.author.tag,
					},
				}).then((err, collection) => {
					if (err) {
						bot.logger.error(err);
					} else {
						bot.logger.posted(`${message.author.tag} add a Website to Ping`)
					}
				});
				message.channel.send(new MessageEmbed()
					.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
					.setColor('GREEN')
					.setDescription('Added Your Website to monitoring')
					.setTimestamp(),
				).then(m => m.delete({ timeout: 60000 }));
			} else {
				try {
					const database = new LinkSchema({
						userID: message.author.id,
						userName: message.author.tag,
						links: message.args[0],
					});
					database.save(database, (err, collection) => {
						if (err) {
							bot.logger.error(err);
						} else {
							bot.logger.posted(`${message.author.tag} newly add a Website to Ping`)
						}
					});
					message.channel.send(new MessageEmbed()
						.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
						.setColor('GREEN')
						.setDescription('Added Your Website to monitoring')
						.setTimestamp(),
					).then(m => m.delete({ timeout: 60000 }));
				} catch (err) {
					if (message.deletable) message.delete();
					bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
					message.channel.error(settings.Language, 'ERROR_MESSAGE', err.message).then(m => m.delete({ timeout: 5000 }));
				}
			}

		}
	}
};
