// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class AddRole extends Command {
	constructor(bot) {
		super(bot, {
			name: 'addrole',
			dirname: __dirname,
			aliases: ['arole', 'roleadd', 'giverole'],
			userPermissions: ['MANAGE_ROLES'],
			botPermissions: ['MANAGE_ROLES'],
			description: 'Adds a role to someone',
			usage: 'addrole <user mention/ID> <role mention/ID> [reason]',
			cooldown: 3000,
			examples: ['addrole @𝑃𝑜𝑤𝑒𝑟𝑠𝑡𝑎𝑟™ @Member verified by me'],
		});
	}

	async run(bot, message, settings) {
		// Delete message
		if (settings.ModerationClearToggle & message.deletable) message.delete();

		// Make sure user can ban users
		if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.error(settings.Language, 'USER_PERMISSION', 'MANAGE_ROLES').then(m => m.delete({ timeout: 10000 }));


		// Check if bot has permission to ban user
		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			bot.logger.error(`Missing permission: \`MANAGE_ROLES\` in [${message.guild.id}].`);
			return message.channel.error(settings.Language, 'MISSING_PERMISSION', 'MANAGE_ROLES').then(m => m.delete({ timeout: 10000 }));
		}

		const member = this.getMemberFromMention(message, message.args[0]) || message.guild.members.cache.get(message.args[0]);
		if (!member) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}
		if (member.roles.highest.position >= message.member.roles.highest.position) {
			return message.channel.send('You cannot add a role to someone with an equal or higher role');
		}

		const role = this.getRoleFromMention(message, message.args[1]) || message.guild.roles.cache.get(message.args[1]);

		let reason = message.args.slice(2).join(' ');
		if (!reason) reason = '`None`';
		if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

		if (!role) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		} else if (member.roles.cache.has(role.id)) {
		// If member already has role
			return message.channel.send('User already has the provided role');
		} else {
			try {
				// Add role
				await member.roles.add(role);
				const embed = new MessageEmbed()
					.setTitle('Add Role')
					.setDescription(`${role} was successfully added to ${member}.`)
					.addField('Moderator', message.member, true)
					.addField('Member', member, true)
					.addField('Role', role, true)
					.addField('Reason', reason)
					.setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp()
					.setColor('RANDOM');
				message.channel.send(embed);

			} catch (err) {
				bot.logger.error(err.stack);
				return message.channel.send('Please check the role hierarchy');
			}
		}
	}

};