/** @format */

const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js')

/**
 * Llama command
 * @extends {Command}
 */
module.exports = class Llama extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'llama',
			dirname: __dirname,
			aliases: ['llama'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a llama',
			usage: 'llama',
			cooldown: 1000,
		})
	}
	/**
	 * Function for receiving message.
	 * @param {bot} bot The instantiating client
	 * @param {message} message The message that ran the command
	 * @readonly
	 */
	async run(bot, message) {
		randomGen.lama(message, 'message')
	}
}
