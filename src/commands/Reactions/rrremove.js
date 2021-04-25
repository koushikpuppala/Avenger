// Dependecies
const Command = require('../../structures/Command.js'),
	{ ReactionRoleSchema } = require('../../database/models');

module.exports = class Rrremove extends Command {
	constructor(bot) {
		super(bot, {
			name: 'rrremove',
			dirname: __dirname,
			aliases: ['rrdel', 'rrr', 'rrdelete'],
			userPermissions: ['MANAGE_GUILD'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Remove reaction roles',
			usage: 'rrremove <messageID>',
			cooldown: 5000,
			examples: ['rrremove 78448484818184431'],
		});
	}

	// Run command
	async run(bot, message, settings) {
		const [messageId] = message.args;

		if (!messageId) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}

		const reaction = await ReactionRoleSchema.findOne({
			guild_id: message.guild.id,
			message_id: messageId,
		});

		if (!reaction) {
			return message.channel.send('Reaction was not found by that messageId');
		}

		const channel = message.guild.channels.cache.get(reaction.channel_id);
		const msg = channel.messages.cache.get(messageId) || (await channel.messages.fetch(messageId));
		if (!msg) return message.channel.send('Reaction was found but the message was not, reaction was deleted from the database');

		msg.delete();
		await ReactionRoleSchema.findOneAndDelete({ message_id: messageId });

		return message.channel.send('Successfully deleted reaction');
	}
};
