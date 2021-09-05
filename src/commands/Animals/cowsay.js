/** @format */

const cowsay = require('cowsay'),
	Command = require('../../structures/Command.js')

/**
 * Cowsay command
 * @extends {Command}
 */
module.exports = class Cowsay extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'cowsay',
			dirname: __dirname,
			aliases: ['cowsay'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Let a cow say something',
			usage: 'cowsay',
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
			const text = message.args.join(' ')
			if (!text) {
				return message.channel
					.error('misc:ERROR_MESSAGE', { ERROR: 'Check the Usage using Help Command' })
					.then((m) => m.timedDelete({ timeout: 5000 }))
			}
			msg.delete()
			message.channel.send(`\`\`\` ${cowsay.say({ text, T: 'U', e: 'oO' })} \`\`\``)
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
			const text = message.args.join(' ')
			if (!text) {
				return interaction.reply({
					embeds: [
						channel.error(
							'misc:ERROR_MESSAGE',
							{ ERROR: 'Check the Usage using Help Command' },
							true
						),
					],
					ephemeral: true,
				})
			}
			interaction.reply(`\`\`\` ${cowsay.say({ text, T: 'U', e: 'oO' })} \`\`\``)
		} catch (err) {
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`)
			interaction.reply({
				embeds: [channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }, true)],
				ephemeral: true,
			})
		}
	}
}
