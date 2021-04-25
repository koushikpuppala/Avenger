// Dependencies
const { MessageEmbed } = require('discord.js'),
	Event = require('../structures/Event');

module.exports = class guildCreate extends Event {
	async run(bot, guild) {
		// LOG server Join
		bot.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot.`);

		// Apply server settings
		try {
			const newGuild = {
				guildID: guild.id,
				guildName: guild.name,
			};
			await bot.CreateGuild(newGuild);
		} catch (e) {
			console.error(e);
		}
		await guild.fetchGuildConfig();

		// Send message to channel that bot has joined a server
		const embed = new MessageEmbed()
			.setTitle('Avenger joined a new server!')
			.setDescription(guild.name)
			.setColor('GREEN')
			.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
			.addField('Owner', guild.owner.user.tag)
			.addField('Member Count', guild.memberCount)
			.setFooter(guild.id)
			.setTimestamp();
		// Find channel and send message
		const modChannel = await bot.channels.fetch(bot.config.SupportServer.GuildChannel);
		if (modChannel) bot.addEmbed(modChannel.id, embed);
		// const join = guild.channels.cache.find((c) => c.type === 'text' || c.postable);
		// if (!join) return;

		// join.send([new MessageEmbed()
		// 	.setTitle(`Hey there, thanks for inviting me in to this wonderful server(${guild.name})`)
		// 	.setDescription('***Here is the short Note for me\nTo let you know easily about my Setup***')
		// 	.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
		// 	.addField('Help Command', `Start by typing \`${bot.config.defaultSettings.prefix}help\` to get a list of commands`)
		// 	.addField('Bug Report', `If you found any bugs please report them using \`${bot.config.defaultSettings.prefix}bug\``)
		// 	.addField('Suggestions', `If you have any ideas that you would like to see in this bot feel free to suggest them using \`${bot.config.defaultSettings.prefix}suggestion\``)
		// 	.addField('Support', `If you still have any questions ask them in our server, use \`${bot.config.defaultSettings.prefix}support\``)
		// 	.addField('Language', `The defult language of Avenger bot is English.If you want to change language use \`${bot.config.defaultSettings.prefix}set-lang\` to change the language`)
		// 	.addField('Invite', 'Invite me to your own Servers\nHere is the link [Avengers](https://discord.com/oauth2/authorize?client_id=775412494235729960&scope=bot&permissions=2088762486)')
		// 	.setFooter(`Created by 𝑷𝒐𝒘𝒆𝒓𝒔𝒕𝒂𝒓™\nHave a nice day`)
		// 	.setColor('#008000')
		// 	.setTimestamp(),
		// ]);
	}
};
