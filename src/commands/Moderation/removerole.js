/** @format */

// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js')

module.exports = class RemoveRole extends Command {
	constructor(bot) {
		super(bot, {
			name: 'removerole',
			dirname: __dirname,
			aliases: ['roleremove', 'rrole', 'takerole'],
			userPermissions: ['MANAGE_ROLES'],
			botPermissions: ['MANAGE_ROLES'],
			description: 'Removes a role from someone',
			usage: 'removerole <user mention/ID> <role mention/ID> [reason]',
			cooldown: 3000,
			examples: ['removerole @𝑃𝑜𝑤𝑒𝑟𝑠𝑡𝑎𝑟™ @Mod He is a inactive'],
		})
	}

	async run(bot, message, settings) {
		// Delete message
		if (settings.ModerationClearToggle & message.deletable) message.delete()

		// Get user
		let member = await message.getMember()

		// Make sure user can ban users
		if (!member.permissions.has('MANAGE_ROLES'))
			return message.channel
				.error(settings.Language, 'USER_PERMISSION', 'MANAGE_ROLES')
				.then((m) => m.delete({ timeout: 10000 }))

		// Check if bot has permission to ban user
		if (!guild.me.hasPermission('MANAGE_ROLES')) {
			bot.logger.error(`Missing permission: \`MANAGE_ROLES\` in [${message.guild.id}].`)
			return message.channel
				.error(settings.Language, 'MISSING_PERMISSION', 'MANAGE_ROLES')
				.then((m) => m.delete({ timeout: 10000 }))
		}
		member =
			this.getMemberFromMention(message, message.args[0]) ||
			message.guild.members.cache.get(message.args[0])
		if (!member) {
			return message.channel
				.error(
					settings.Language,
					'INCORRECT_FORMAT',
					settings.prefix.concat(this.help.usage)
				)
				.then((m) => m.delete({ timeout: 5000 }))
		}
		if (member.roles.highest.position >= message.member.roles.highest.position) {
			return message.channel.send(
				'You cannot remove a role from someone with an equal or higher role'
			)
		}

		const role =
			this.getRoleFromMention(message, message.args[1]) ||
			message.guild.roles.cache.get(message.args[1])

		let reason = message.args.slice(2).join(' ')
		if (!reason) reason = '`None`'
		if (reason.length > 1024) reason = reason.slice(0, 1021) + '...'

		if (!role) {
			return message.channel
				.error(
					settings.Language,
					'INCORRECT_FORMAT',
					settings.prefix.concat(this.help.usage)
				)
				.then((m) => m.delete({ timeout: 5000 }))
		} else if (!member.roles.cache.has(role.id)) {
			// If member already has role
			return message.channel.send('User does not have the provided role')
		} else {
			try {
				// Add role
				await member.roles.remove(role)
				const embed = new MessageEmbed()
					.setTitle('Remove Role')
					.setDescription(`${role} was successfully removed from ${member}.`)
					.addField('Moderator', message.member, true)
					.addField('Member', member, true)
					.addField('Role', role, true)
					.addField('Reason', reason)
					.setFooter(
						message.member.displayName,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setTimestamp()
					.setColor('RANDOM')
				message.channel.send({ embeds: [embed] })
			} catch (err) {
				bot.logger.error(err.stack)
				return message.channel.send('Please check the role hierarchy')
			}
		}
	}
}
