/** @format */

// Dependencies
const Event = require('../../structures/Event')

/**
 * Error event
 * @event Avenger#Error
 * @extends {Event}
 */
class Error extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		})
	}

	/**
	 * Function for receiving event.
	 * @param {bot} bot The instantiating client
	 * @param {Error} error The error encountered
	 * @readonly
	 */
	async run(bot, err) {
		console.log(err)
		bot.logger.error(`Bot encountered an error: ${err.message}.`)
	}
}

module.exports = Error
