/* eslint-disable no-useless-escape */
// Dependecies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Suggestion extends Command {
	constructor(bot) {
		super(bot, {
			name: 'suggestion',
			dirname: __dirname,
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Add a suggestion to bot',
			usage: 'suggestion <title> - <description> - <plugin>',
			cooldown: 3000,
			examples: ['suggestion Level reset - Should member levels reset when they leave the server - Economy plugin'],
		});
	}

	// Run command
	async run(bot, message, settings) {
		// get suggestion channel
		const channel = bot.channels.cache.get(bot.config.SupportServer.SuggestionChannel);
		if (!channel) return message.channel.send('Please properly set up your config.');

		const words = message.args.join(' ').split('-');
		if (words.length != 3) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		// send message
		const title = words[0],
			description = words[1],
			plugin = words[2];

		const embed = new MessageEmbed()
			.setAuthor(`\"${message.author.tag}\" gave us a Suggestion`, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(title)
			.setDescription(description)
			.addField('Category', plugin)
			.setTimestamp()
			.setFooter(`${message.author.id}(${message.author.tag})`);

		channel.send(embed).then(async (msg) => {
			await msg.react('<a:tick:818394472563605554>');
			await msg.react('<a:cross:818394472224260118>');
		});
		return message.channel.send('<a:tick:818394472563605554>Your Suggestion Submitted Sucessfully');
	}
};
