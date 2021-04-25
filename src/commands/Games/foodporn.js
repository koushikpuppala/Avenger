const fetch = require('node-fetch'),
	Command = require('../../structures/Command.js'),
	{ MessageEmbed } = require('discord.js');

module.exports = class Foodporn extends Command {
	constructor(bot) {
		super(bot, {
			name: 'foodporn',
			dirname: __dirname,
			aliases: ['foodporn'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows Food images',
			usage: 'foodporn',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		const data = await fetch(
			'https://www.reddit.com/r/food/random/.json',
		).then((res) => res.json());

		const children = data[0].data.children[0];
		const permaLink = children.data.permalink;
		const url = `https://reddit.com${permaLink}`;
		const image = children.data.url;
		const title = children.data.title;
		const upvotes = children.data.ups;
		const comments = children.data.num_comments;

		const embed = new MessageEmbed(message)
			.setTitle(`${title}`)
			.setURL(url)
			.setImage(image)
			.setFooter(`👍: ${upvotes} -  💬: ${comments}`);

		message.channel.send({ embed });
	}
};
