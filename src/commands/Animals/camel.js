/** @format */

const randomGen = require('image-gen-discord'),
	Command = require('../../structures/Command.js')

/**
 * Camel command
 * @extends {Command}
 */
module.exports = class Camel extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'camel',
			dirname: __dirname,
			aliases: ['camel'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows a picture of a camel',
			usage: 'camel',
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
		randomGen.camel(message, 'message')
	}
}
