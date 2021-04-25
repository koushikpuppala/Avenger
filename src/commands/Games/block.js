// Dependencies
const Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Block extends Command {
	constructor(bot) {
		super(bot, {
			name: 'block',
			dirname: __dirname,
			aliases: ['block'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Write text with blocks',
			usage: 'block <text>',
			cooldown: 1000,
		});
	}

	async run(bot, message, settings) {
		if (!message.args.length) {
			return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		}

		const blocks = message.args
			.join(' ')
			.toLowerCase()
			.replace(/[a-z]/g, ':regional_indicator_$&:')
			.replace(/1/g, ':one:')
			.replace(/2/g, ':two:')
			.replace(/3/g, ':three:')
			.replace(/4/g, ':four:')
			.replace(/5/g, ':five:')
			.replace(/6/g, ':six:')
			.replace(/7/g, ':seven:')
			.replace(/8/g, ':eight:')
			.replace(/9/g, ':nine:')
			.replace(/0/g, ':zero:');

		const embed = new MessageEmbed(message).setDescription(blocks);

		message.channel.send(embed);

	}

};