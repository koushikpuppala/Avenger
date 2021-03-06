/** @format */

// Dependencies
const Event = require('../../structures/Event')

/**
 * Debug event
 * @event Avenger#Debug
 * @extends {Event}
 */
class Debug extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		})
	}

	/**
	 * Function for receiving event.
	 * @param {bot} bot The instantiating client
	 * @param {string} info The debug information
	 * @readonly
	 */
	async run(bot, info) {
		if (bot.config.debug) bot.logger.debug(info)
	}
}

module.exports = Debug
