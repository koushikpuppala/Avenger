/** @format */

// Dependencies
const { MessageEmbed, MessageAttachment } = require('discord.js'),
	{ Canvas } = require('canvacord'),
	Event = require('../../structures/Event')

/**
 * Guild create event
 * @event Avenger#GuildCreate
 * @extends {Event}
 */
class GuildCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		})
	}

	/**
	 * Function for receiving event.
	 * @param {bot} bot The instantiating client
	 * @param {Guild} guild The guild that added the bot
	 * @readonly
	 */
	async run(bot, guild) {
		// LOG server Join
		bot.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot.`)

		// Apply server settings
		try {
			// Create guild settings and fetch cache.
			await guild.fetchSettings()
		} catch (err) {
			bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`)
		}

		// Send message to channel that bot has joined a server
		const owner = await guild.members.fetch(guild.ownerId)
		const embed = new MessageEmbed().setTitle(`[GUILD JOIN] ${guild.name}`)
		let attachment
		if (guild.icon == null) {
			const icon = await Canvas.guildIcon(guild.name, 128)
			attachment = new MessageAttachment(icon, 'guildicon.png')
			embed.setImage('attachment://guildicon.png')
		} else {
			embed.setImage(guild.iconURL({ dynamic: true, size: 1024 }))
		}
		embed.setDescription(
			[
				`Guild ID: ${guild.id ?? 'undefined'}`,
				`Owner: ${owner.user.tag}`,
				`MemberCount: ${guild.memberCount ?? 'undefined'}`,
			].join('\n')
		)

		// Fetch all members in guild
		try {
			await guild.members.fetch()
		} catch (err) {
			bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`)
		}

		// Find channel and send message
		const modChannel = await bot.channels
			.fetch(bot.config.SupportServer.GuildCreateChannel)
			.catch(() => bot.logger.error(`Error fetching guild: ${guild.id} logging channel`))
		if (modChannel) bot.addEmbed(modChannel.id, [embed, attachment])

		// update bot's activity
		bot.SetActivity(
			['LISTENING', 'LISTENING', 'COMPETING'],
			[
				`${bot.guilds.cache.size} Servers!`,
				`${bot.guilds.cache.map((g) => g).reduce((a, b) => a + b.memberCount, 0)} Users!`,
				`${bot.guilds.cache.size} Servers with ${bot.guilds.cache
					.map((g) => g)
					.reduce((a, b) => a + b.memberCount, 0)} Users!`,
			]
		)

		// get slash commands for category
		const enabledPlugins = guild.settings.plugins
		const data = []
		for (const plugin of enabledPlugins) {
			const g = await bot.loadInteractionGroup(plugin, guild)
			if (Array.isArray(g)) data.push(...g)
		}

		// upload slash commands to guild
		try {
			await bot.guilds.cache.get(guild.id)?.commands.set(data)
			bot.logger.log('Loaded Interactions for guild: ' + guild.name)
		} catch (err) {
			bot.logger.error(
				`Failed to load interactions for guild: ${guild.id} due to: ${err.message}.`
			)
		}
		// Send Message to server Channel which bot added
		const join = guild.channels.cache.find((c) => c.type === 'text' || c.postable)
		if (!join) return

		join.send([
			new MessageEmbed()
				.setTitle(
					`Hey there, thanks for inviting me in to this wonderful server(${guild.name})`
				)
				.setDescription(
					'***Here is the short Note for me\nTo let you know easily about my Setup***'
				)
				.setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
				.addField(
					'Help Command',
					`Start by typing \`${bot.config.defaultSettings.prefix}help\` to get a list of commands`
				)
				.addField(
					'Bug Report',
					`If you found any bugs please report them using \`${bot.config.defaultSettings.prefix}bug\``
				)
				.addField(
					'Suggestions',
					`If you have any ideas that you would like to see in this bot feel free to suggest them using \`${bot.config.defaultSettings.prefix}suggestion\``
				)
				.addField(
					'Support',
					`If you still have any questions ask them in our server, use \`${bot.config.defaultSettings.prefix}support\``
				)
				.addField(
					'Language',
					`The default language of Avenger bot is English.If you want to change language use \`${bot.config.defaultSettings.prefix}set-lang\` to change the language`
				)
				.addField(
					'Invite',
					'Invite me to your own Servers\nHere is the link [Avengers](https://discord.com/oauth2/authorize?client_id=775412494235729960&scope=bot&permissions=2088762486)'
				)
				.setFooter('Created by 𝑷𝒐𝒘𝒆𝒓𝒔𝒕𝒂𝒓™\nHave a nice day')
				.setColor('#008000')
				.setTimestamp(),
		])
	}
}

module.exports = GuildCreate
