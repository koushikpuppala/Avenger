// Dependencies
const Command = require('../../structures/Command.js'),
	math = require('mathjs'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Calc extends Command {
	constructor(bot) {
		super(bot, {
			name: 'calc',
			dirname: __dirname,
			aliases: ['calculator', 'math'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Calculate something',
			usage: 'calc <math>',
			cooldown: 1000,
		});
	}

	async run(bot, message, settings) {
		if (!message.args) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		try {
			const calculation = math.evaluate(message.args.join(' '));

			const embed = new MessageEmbed(message)
				.setTitle('Maths Calaculation')
				.addField(
					'INPUT :',
					`\`\`\`js\n${message.args.join(' ')}\`\`\``,
				)
				.addField(
					'OUTPUT :',
					`\`\`\`js\n${calculation}\`\`\``,
				);

			message.channel.send(embed);
		} catch (e) {
			return message.channel.send('It is Invalid to Calculate');
		}
	}

};