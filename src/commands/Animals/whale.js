/** @format */

// Dependencies
const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js')

/**
 * Whale command
 * @extends {Command}
 */
module.exports = class Whale extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'whale',
			dirname: __dirname,
			aliases: ['whale'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a whale',
			usage: 'whale',
			cooldown: 1000,
			slash: true,
		})
	}
	/**
	 * Function for receiving message.
	 * @param {bot} bot The instantiating client
	 * @param {message} message The message that ran the command
	 * @readonly
	 */
	async run(bot, message) {
		// send 'waiting' message to show bot has received message
		const msg = await message.channel.send(
			message.translate('misc:FETCHING', {
				EMOJI: message.channel.checkPerm('USE_EXTERNAL_EMOJIS')
					? bot.customEmojis['loading']
					: '',
				ITEM: this.help.name,
			})
		)

		// Connect to API and fetch data
		try {
			const data = await fetch('https://some-random-api.ml/img/whale').then((res) =>
				res.json()
			)
			msg.delete()
			const embed = new MessageEmbed(message)
				.setDescription(`[CLICK_TO_VIEW](${data.link})`)
				.setImage(`${data.link}`)
			message.channel.send({ embeds: [embed] })
		} catch (err) {
			if (message.deletable) message.delete()
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`)
			msg.delete()
			message.channel
				.error('misc:ERROR_MESSAGE', { ERROR: err.message })
				.then((m) => m.timedDelete({ timeout: 5000 }))
		}
	}
	/**
	 * Function for receiving interaction.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @readonly
	 */
	async callback(bot, interaction, guild) {
		const channel = guild.channels.cache.get(interaction.channelId)
		try {
			const data = await fetch('https://some-random-api.ml/img/whale').then((res) =>
				res.json()
			)
			const embed = new MessageEmbed(interaction)
				.setDescription(`[CLICK_TO_VIEW](${data.link})`)
				.setImage(`${data.link}`)
			interaction.reply({
				embeds: [embed],
			})
		} catch (err) {
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`)
			interaction.reply({
				embeds: [channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }, true)],
				ephemeral: true,
			})
		}
	}
}
