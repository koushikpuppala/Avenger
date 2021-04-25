// Dependencies
const ReactionMenu = require('../../utils/ReactionMenu'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Server extends Command {
	constructor(bot) {
		super(bot, {
			name: 'server',
			ownerOnly: true,
			dirname: __dirname,
			aliases: ['serverlist'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Displays a list of Ironman joined servers.',
			usage: 'server',
			cooldown: 3000,
			examples: ['server'],
		});
	}
	async run(bot, message) {
		const servers = bot.guilds.cache.array().map(guild => {
			return `\`${guild.id}\` - **${guild.name}** - \`${guild.members.cache.size}\` members`;
		});

		const embed = new MessageEmbed()
			.setTitle('Server List')
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(message.guild.me.displayHexColor);

		if (servers.length <= 10) {
			const range = (servers.length == 1) ? '[1]' : `[1 - ${servers.length}]`;
			message.channel.send(embed.setTitle(`Server List ${range}`).setDescription(servers.join('\n')));
		} else {
			new ReactionMenu(message.bot, message.channel, message.member, embed, servers);
		}
	}
};