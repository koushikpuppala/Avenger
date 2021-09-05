/** @format */

// Dependencies
const path = require('path')

/**
 * Command structure
 * @abstract
 */
class Command {
	constructor(
		bot,
		{
			name = null,
			guildOnly = false,
			dirname = false,
			aliases = new Array(),
			botPermissions = new Array(),
			userPermissions = new Array(),
			examples = new Array(),
			nsfw = false,
			ownerOnly = false,
			cooldown = 3000,
			description = '',
			usage = '',
			slash = false,
			options = new Array(),
			defaultPermission = true,
		}
	) {
		const category = dirname
			? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)]
			: 'Other'
		this.conf = {
			guildOnly,
			userPermissions,
			botPermissions,
			nsfw,
			ownerOnly,
			cooldown,
			slash,
			options,
			defaultPermission,
		}
		this.help = { name, category, aliases, description, usage, examples }
	}

	/**
	 * Function for receiving message.
	 * @param {bot} bot The instantiating client
	 * @param {message} message The message that ran the command
	 * @readonly
	 */
	async run() {
		throw new Error(`Command: ${this.help.name} does not have a run method`)
	}

	isURL(url) {
		if (!url) return false
		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
				'localhost' + // OR localhost
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		) // fragment locator
		return pattern.test(url)
	}

	/**
	 * Function for receiving interaction.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @readonly
	 */
	async callback() {
		throw new Error(`Command: ${this.help.name} does not have a callback method`)
	}
	/**
	 * Gets member from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getMemberFromMention(message, mention) {
		if (!mention) return
		const matches = mention.match(/^<@!?(\d+)>$/)
		if (!matches) return
		const id = matches[1]
		return message.guild.members.cache.get(id)
	}

	/**
	 * Gets role from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getRoleFromMention(message, mention) {
		if (!mention) return
		const matches = mention.match(/^<@&(\d+)>$/)
		if (!matches) return
		const id = matches[1]
		return message.guild.roles.cache.get(id)
	}

	/**
	 * Gets text channel from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getChannelFromMention(message, mention) {
		if (!mention) return
		const matches = mention.match(/^<#(\d+)>$/)
		if (!matches) return
		const id = matches[1]
		return message.guild.channels.cache.get(id)
	}
}

module.exports = Command
