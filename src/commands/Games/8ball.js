// Dependencies
const answers = require('../../assets/json/8ball.json'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Ball8 extends Command {
	constructor(bot) {
		super(bot, {
			name: '8ball',
			dirname: __dirname,
			aliases: ['8ball'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Receive a 8Ball Answer.',
			usage: '8ball <question>',
			cooldown: 1000,
		});
	}

	async run(bot, message, settings) {
		const question = message.args.join(' ');

		if (!question) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));


		const answer = answers[Math.floor(Math.random() * answers.length)];

		const embed = new MessageEmbed(message)
			.setTitle('8Ball')
			.addField('Question:', question)
			.addField('Answer:', answer);

		message.channel.send(embed);
	}
};