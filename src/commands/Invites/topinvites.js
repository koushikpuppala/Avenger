// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Topinvites extends Command {
	constructor(bot) {
		super(bot, {
			name: 'topinvites',
			dirname: __dirname,
			aliases: ['ti'],
			botPermissions: [ 'MANAGE_GUILD'],
			description: 'Shows the top invites in a server.',
			usage: 'topinvites',
			cooldown: 2000,
		});
	}

	async run(message) {
		const invites = await message.guild.fetchInvites();
		const topTen = invites.filter((inv) => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);

		if(topTen.length === 0) return message.channel.send('There are no invites, or none of them have been used!');

		message.channel.send(new MessageEmbed()
			.setTitle(`Top Invites in ${message.guild.name}`)
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setDescription(topTen.map((inv) => `• **${inv.inviter.username}**'s invite **${inv.code}** has **${inv.uses.toLocaleString()}** uses.`).join('\n')))
			.setTimestamp()
			.setFooter(`Requested by ${message.author.username}`);
	}

};