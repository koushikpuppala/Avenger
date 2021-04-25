// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class HttpStatus extends Command {
	constructor(bot) {
		super(bot, {
			name: 'httpstatus',
			dirname: __dirname,
			aliases: ['httpcat', 'cathttp'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'HTTP Status codes with Cats!',
			usage: 'httpstatus <status>',
			cooldown: 3000,
			examples: ['httpstatus 599'],
		});
	}

	async run(bot, message, settings) {
		// 599 isn't standard i think, not in Node.js but it's on http.cat so let's handle it.
		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		message.channel.send(new MessageEmbed()
			.setTitle('HTTP Cat')
			.setImage(`https://http.cat/${message.args[0]}.jpg`)
			.setDescription(message.args[0])
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 })));
	}

};