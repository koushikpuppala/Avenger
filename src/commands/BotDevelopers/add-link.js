const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fs = require('fs');

module.exports = class AddLink extends Command {
	constructor(bot) {
		super(bot, {
			'name': 'addlink',
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


			const database = JSON.parse(fs.readFileSync('./src/link.json', 'utf8'));

			const check = database.find(x => x.id === message.author.id);

			if (check) {
				if (check.link.length === 5) {
					return message.channel.send(new MessageEmbed()
						.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
						.setDescription('You reached your limit, you can not add more than 5 website.')
						.setTimestamp(),
					).then(m => m.delete({ timeout: 60000 }));
				}
				const numb = database.indexOf(check);
				database[numb].link.push(message.args[0]);
			} else {
				database.push({
					id: message.author.id,
					name: message.author.username,
					link: [message.args[0]],
				});
			}

			fs.writeFile('./src/link.json', JSON.stringify(database, null, 2), err => {
				if (err) console.log(err);
			});

			message.channel.send(new MessageEmbed()
				.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setColor('GREEN')
				.setDescription('Added Your Website to monitoring')
				.setTimestamp(),
			).then(m => m.delete({ timeout: 60000 }));
		}
	}
};