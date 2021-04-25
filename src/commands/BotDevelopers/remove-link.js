/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fs = require('fs');

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
		let database = JSON.parse(fs.readFileSync('./src/link.json', 'utf8'));

		if (!database) return message.channel.send('Something went wrong...').then(m => m.delete({ timeout: 5000 }));

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

			const data = database.find((x) => x.id === message.author.id);

			if (!data) return message.channel.send('You do not have any site to monitor, use `${bot.config.defaultSettings.prefix}` too add a website');

			const value = database.indexOf(data);
			const array = [];

			database[value].link.forEach((m, i) => {
				array.push(`**[${i + 1}]**: \`${m}\``);
			});

			const embed = new MessageEmbed()
				.setTitle('Send The number of the link to remove')
				.setColor('BLUE')
				.setDescription(array.join('\n'));

			const msg = await message.channel.send(embed);

			const responses = await message.channel.awaitMessages(
				(msg) => msg.author.id === message.author.id,
				{ time: 300000, max: 1 },
			);
			const repMsg = responses.first();

			if (!repMsg) {
				msg.delete();
				return message.channel.send('Cancelled The Process of deleting monitor website.');
			}

			if (isNaN(repMsg.content)) {
				msg.delete();
				return message.channel.send('Cancelled The Process of deleting monitor website due to **invalid digit**');
			}

			if (!database[value].link[parseInt(repMsg.content) - 1]) {
				msg.delete();
				return message.channel.send('There is no link exist with this number.');
			}

			if (database[value].link.length === 1) {
				delete database[value];

				var filtered = database.filter((el) => {
					return el != null && el != '';
				});

				database = filtered;
			} else {
				delete database[value].link[parseInt(repMsg.content) - 1];

				var filtered = database[value].link.filter((el) => {
					return el != null && el != '';
				});

				database[value].link = filtered;
			}

			fs.writeFile('./src/link.json', JSON.stringify(database, null, 2), (err) => {
				if (err) console.log(err);
			});

			repMsg.delete();
			msg.delete();

			message.channel.send(new MessageEmbed()
				.setTitle(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setDescription('Removed the website from monitoring, you can check website using `${bot.config.defaultSettings.prefix}stats`')
				.setColor('GREEN')
				.setTimestamp(),
			).then(m => m.delete({ timeout: 5000 }));
		}
	}
};
