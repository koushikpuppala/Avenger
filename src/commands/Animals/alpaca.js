/** @format */

// Dependencies
const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js')

/**
 * Alpaca command
 * @extends {Command}
 */
module.exports = class Alpaca extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'alpaca',
			dirname: __dirname,
			aliases: ['alpaca'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a alpaca',
			usage: 'alpaca',
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
		randomGen.alpaca(message, 'message')
	}
}
