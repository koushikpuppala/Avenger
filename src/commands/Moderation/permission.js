// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	permissions = require('../../assets/json/permissions.json');

module.exports = class Permission extends Command {
	constructor(bot) {
		super(bot, {
			name: 'permission',
			dirname: __dirname,
			aliases: ['perms'],
			userPermissions: ['MANAGE_ROLES'],
			botPermissions: ['MANAGE_ROLES'],
			description: 'Displays all current permissions for the specified user.\nIf no user is given, your own permissions will be displayed',
			usage: 'permission [user mention/ID]',
			cooldown: 3000,
			examples: ['permission @𝑃𝑜𝑤𝑒𝑟𝑠𝑡𝑎𝑟™'],
		});
	}

	async run(bot, message, args) {
		const member = this.getMemberFromMention(message, args[0]) ||
		message.guild.members.cache.get(args[0]) ||
		message.member;

		// Get member permissions
		const memberPermissions = member.permissions.toArray();
		const finalPermissions = [];
		for (const permission in permissions) {
			if (memberPermissions.includes(permission)) finalPermissions.push(`+ ${permissions[permission]}`);
			else finalPermissions.push(`- ${permissions[permission]}`);
		}

		const embed = new MessageEmbed()
			.setTitle(`${member.displayName}'s Permissions`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(`\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)
			.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp()
			.setColor(member.displayHexColor);
		message.channel.send({ embeds: [embed] });
	}

};