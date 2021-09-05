// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fetch = require('node-fetch');

module.exports = class Wikipedia extends Command {
	constructor(bot) {
		super(bot, {
			name: 'wikipedia',
			dirname: __dirname,
			aliases: ['wiki'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Finds a Wikipedia Article by title.',
			usage: 'wikipedia <query>',
			cooldown: 2000,
		});
	}

	async run(bot, message, settings) {

		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		const article = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(message.args.join(' '))}`)
			.then((res) => res.json())
			.catch(() => {
				throw 'I couldn\'t find a wikipedia article with that title!';
			});

		if(!article.content_urls) throw 'I couldn\'t find a wikipedia article with that title!';
		const embed = new MessageEmbed()
			.setThumbnail('https://i.imgur.com/fnhlGh5.png')
			.setURL(article.content_urls.desktop.page)
			.setTitle(article.title)
			.setDescription(article.extract);
		message.channel.send({ embeds: [embed] });
	}
};