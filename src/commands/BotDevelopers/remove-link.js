/* eslint-disable no-shadow */
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	LinkSchema = require('../../database/models');

module.exports = class RemoveLink extends Command {
	constructor(bot) {
		super(bot, {
			name: 'removelink',
			dirname: __dirname,
			aliases: ['rl', 'unmonitor'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Remove link from ping for hosting bot',
			usage: 'remove',
			cooldown: 2000,
		});
	}

	async run(bot, message) {

		if (message.channel.id != bot.config.SupportServer.HostChannel) {
			return message.channel.send(new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('This command only work on my support server.')
				.addField('Support Server', `Join my [Support server](${bot.config.SupportServer.link}) to use this command`)
				.addField('Host Channel', `If you are in Support server then go to channel <#${bot.config.SupportServer.HostChannel}>`)
				.addField('Role', `If you are unable to see channel <#${bot.config.SupportServer.HostChannel}> then go to channel <#791571731721617438> and take the role <@&831846178609430528>`)
				.setTimestamp(),
			).then(m => m.delete({ timeout: 30000 }));
		} else {

			const data = LinkSchema.find({
				userID: message.author.id,
			});

			if (!data) return message.channel.send('You do not have any site to monitor, use `${bot.config.defaultSettings.prefix}`addlink too add a website');

			const category = message.guild.channels.cache.get(bot.config.SupportServer.HostCategory);

			const array = [];

			data.links.forEach((m) => {
				array.push(`**\`${m}\`**`);
			});

			// create channel
			message.guild.channels.create(`ticket-${message.author.id}`, {
				type: 'text',
				reason: '${message.author.tag} has created a ticket',
				parent: category.id,
				permissionOverwrites: [
					{ id: message.author, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
					{ id: message.guild.roles.everyone, deny: ['SEND_MESSAGES', 'VIEW_CHANNEL'] },
					{ id: bot.user, allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS'] }],
			})
				.then(channel => {

					setTimeout(() => {

						const embed = new MessageEmbed()
							.setTitle('Send The number of the link to remove')
							.setColor('BLUE')
							.setDescription(array.join('\n'));

						const msg = channel.send(embed);

						const responses = channel.awaitMessages(
							(msg) => msg.author.id === message.author.id,
							{ time: 300000, max: 1 },
						);
						const repMsg = responses.first();

						if (!repMsg) {
							msg.delete();
							return channel.send('Cancelled The Process of deleting monitor website.');
						}

						if (!this.isURL(repMsg.content)) {
							msg.delete();
							return channel.send('Cancelled The Process of deleting monitor website due to **Invalid URL**');
						}

						const link = LinkSchema.find({
							userID: message.author.id,
							links: repMsg.content,
						});

						if (!link) {
							msg.delete();
							return channel.send('There is no link exist with this number.');
						}

						if (data.links.length === 1) {
							LinkSchema.findOneAndDelete({
								userID: message.author.id,
								links: repMsg.content,
							});
						} else {
							LinkSchema.findOneAndUpdate({
								userID: message.author.id,
							},
							{
								$pull: {
									links: repMsg.content,
								},
							});
						}

						repMsg.delete();
						msg.delete();

						channel.send(new MessageEmbed()
							.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
							.setDescription('Removed the website from monitoring, you can check website using `${bot.config.defaultSettings.prefix}`linkstats and this Channel will be deleted in 1 Minute')
							.setColor('GREEN')
							.setTimestamp(),
						).then(m => m.delete({ timeout: 5000 }));

						// delete channel
						channel.delete();
					}, 60000);

				});
		}
	}
};
