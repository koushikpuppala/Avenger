// Dependecies
const Command = require('../../structures/Command.js');

module.exports = class Setperfix extends Command {
	constructor(bot) {
		super(bot, {
			name: 'setprefix',
			dirname: __dirname,
			aliases: ['setpre', 'set-prefix'],
			userPermissions: ['MANAGE_GUILD'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Change prefix for the bot.',
			usage: 'setprefix <new prefix>',
			cooldown: 5000,
			examples: ['setprefix a!'],
		});
	}

	// Run command
	async run(bot, message, settings) {

		const newprefix = message.args[0];

		// Delete message
		if (settings.ModerationClearToggle & message.deletable) message.delete();

		// Make sure user can edit server plugins
		if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.error(settings.Language, 'USER_PERMISSION', 'MANAGE_GUILD').then(m => m.delete({ timeout: 10000 }));

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
