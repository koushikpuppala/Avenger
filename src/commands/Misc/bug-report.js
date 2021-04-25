// Dependecies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class BugReport extends Command {
	constructor(bot) {
		super(bot, {
			name: 'bug',
			dirname: __dirname,
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Found a bug? report with this.',
			usage: 'bug <title> - <description> - <plugin>',
			cooldown: 3000,
			examples: ['bug Dashboard - They Dashboard is not opening in website - Guild plugin'],
		});
	}

	// Run command
	async run(bot, message, settings) {
		// get Bugreport channel
		const channel = bot.channels.cache.get(bot.config.SupportServer.BugReportChannel);

		const words = message.args.join(' ').split('-');
		if (words.length != 3) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
		// send message
		const title = words[0],
			description = words[1],
			plugin = words[2];

		const embed = new MessageEmbed()
			.setAuthor(`"${message.author.tag}" reported a bug`, message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(title)
			.setDescription(description)
			.addField('Category', plugin)
			.setTimestamp()
			.setFooter(`${message.author.id}(${message.author.tag})`);

		channel.send(`<@${bot.config.ownerID}> IMPORTANT`, { embed }).then(async (msg) => {
			await msg.react('<a:tick:818394472563605554>');
			await msg.react('<a:cross:818394472224260118>');
		});
		return message.channel.send('<a:tick:818394472563605554>Your bug report has been sent to the support server. You will hear back from my owner in DMs if there is anything wrong with your report. Have a nice day!');
	}
};
