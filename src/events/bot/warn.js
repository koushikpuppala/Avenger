/** @format */

// Dependencies
const Event = require('../../structures/Event')

/**
 * Warn event
 * @event Avenger#Warn
 * @extends {Event}
 */
class Warn extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		})
	}

	/**
	 * Function for receiving event.
	 * @param {bot} bot The instantiating client
	 * @param {string} info The warning
	 * @readonly
	 */
	async run(bot, info) {
		console.log('warn:')
		console.log(info)
	}
}

module.exports = Warn
