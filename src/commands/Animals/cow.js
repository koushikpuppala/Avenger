/** @format */

const cowsPack = require('cows'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js')

/**
 * Cow command
 * @extends {Command}
 */
module.exports = class Cow extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'cow',
			dirname: __dirname,
			aliases: ['cow'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a cow ascii',
			usage: 'cow',
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
			const cows = cowsPack()
			const cow = cows[Math.floor(Math.random() * cows.length)]
			msg.delete()
			const embed = new MessageEmbed().setTitle('COW').setDescription(`\`\`\`${cow}\`\`\``)
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
			const cows = cowsPack()
			const cow = cows[Math.floor(Math.random() * cows.length)]
			const embed = new MessageEmbed().setTitle('COW').setDescription(`\`\`\`${cow}\`\`\``)
			interaction.reply({ embeds: [embed] })
		} catch (err) {
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`)
			interaction.reply({
				embeds: [channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }, true)],
				ephemeral: true,
			})
		}
	}
}
