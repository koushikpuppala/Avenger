const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Lavalink extends Command {
	constructor(bot) {
		super(bot, {
			name: 'lavalink',
			dirname: __dirname,
			aliases: ['l'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Send the Public Lavalink Details',
			usage: 'lavalink',
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

			message.channel.send(new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('These are two Server Lavalink Details ')
				.addField('Lavalink 1', '```Host : n12.danbot.host,\nPort : 1423,\nPassword : bHkddM9ADnx73Q$^%KZF```')
				.addField('Lavalink 2', '```Host : n12.danbot.host,\nPort : 1149,\nPassword : yL5#S^+9bAAN%Wc#b9&B```')
				.addField('Lavalink 3', '```Host : n12.danbot.host,\nPort : 1244,\nPassword : ^*4nXHRr7vnT=g#?dqjv```')
				.addField('Lavalink 4', '```Host : n12.danbot.host,\nPort : 1133,\nPassword : #4nM?en%wUdhEr#2xL%c```'),
			).then(m => m.delete({ timeout: 60000 }));
		}
	}

};
