/* eslint-disable no-inline-comments */
// Dependencies
const Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Ping extends Command {
	constructor(bot) {
		super(bot, {
			name: 'ping',
			dirname: __dirname,
			aliases: ['ping'],
			description: 'Gets Avenger\'s current latency and API latency.',
			usage: 'ping',
			cooldown: 2000,
		});
	}

	// Run command
	async run(bot, message) {
		const embed = new MessageEmbed()
			.setDescription('Pinging... <:pong:780112223744950284>')
			.setColor('RANDOM');
		const msg = await message.channel.send(embed);
		const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; // Check if edited
		const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
		const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
		embed.setTitle('Pong! <:pong:780112223744950284>')
			.setDescription('')
			.addField('Latency', latency, true)
			.addField('API Latency', apiLatency, true)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		msg.edit(embed);
	}

};