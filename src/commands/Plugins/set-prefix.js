// Dependencies
const Command = require('../../structures/Command.js');

module.exports = class SetPrefix extends Command {
	constructor(bot) {
		super(bot, {
			name: 'set-prefix',
			dirname: __dirname,
			aliases: ['prefix'],
			userPermissions: ['MANAGE_GUILD'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Change prefix for the bot.',
			usage: 'set-prefix <new prefix>',
			cooldown: 5000,
			examples: ['set-prefix a!'],
		});
	}

	// Run command
	async run(bot, message, settings) {

		const newprefix = message.args[0];

		// Delete message
		if (settings.ModerationClearToggle & message.deletable) message.delete();
		// Get user
		const member = await message.getMember();

		// Make sure user can ban users
		if (!member.permissions.has('MANAGE_ROLES')) return message.channel.error(settings.Language, 'USER_PERMISSION', 'MANAGE_ROLES').then(m => m.delete({ timeout: 10000 }));

		// Make sure a Prefix was entered
		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		// Check prefix length
		if (newprefix.length < 3) {
			try {
				// update database
				await message.guild.updateGuild({ prefix: newprefix });
				message.success(settings.Language, 'PLUGINS/PREFIX_SET', newprefix).then(m => m.delete({ timeout:10000 }));
			} catch (err) {
				if (message.deletable) message.delete();
				bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
				message.channel.error(settings.Language, 'ERROR_MESSAGE').then(m => m.delete({ timeout: 5000 }));
			}
		} else {
			message.channel.error(settings.Language, 'PLUGINS/PREFIX_LENGTH').then(m => m.delete({ timeout:10000 }));
		}
	}
};
