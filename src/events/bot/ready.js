/** @format */

const { GuildSchema, userSchema, TagsSchema } = require('../../database/models'),
	Event = require('../../structures/Event'),
	{ MessageEmbed, version } = require('discord.js')

/**
 * Ready event
 * @event Avenger#Ready
 * @extends {Event}
 */
class Ready extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
			once: true,
		})
	}

	/**
	 * Function for receiving event.
	 * @param {bot} bot The instantiating client
	 * @readonly
	 */
	async run(bot) {
		// Load up audio player
		try {
			bot.manager.init(bot.user.id)
		} catch (err) {
			bot.logger.error(`Audio manager failed to load due to error: ${err.message}`)
		}

		// set up webserver
		try {
			require('../../website/stats')(bot)
		} catch (err) {
			console.log(err.message)
		}

		// webhook manager (loop every 10secs)
		setInterval(async () => {
			await require('../../helpers/webhookManager')(bot)
		}, 10000)

		for (const guild of [...bot.guilds.cache.values()]) {
			// Sort out guild settings
			await guild.fetchSettings()
			if (guild.settings == null) return bot.emit('guildCreate', guild)
			if (guild.settings.plugins.includes('Level')) await guild.fetchLevels()

			// Append tags to guild specific arrays
			if (guild.settings.PrefixTags) {
				TagsSchema.find({ guildID: guild.id }).then((result) => {
					result.forEach((value) => {
						guild.guildTags.push(value.name)
					})
				})
			}
		}

		// Set up the bot's user count and guild count
		const GuildCount = bot.guilds.cache.size,
			UserCount = bot.guilds.cache.map((g) => g).reduce((a, b) => a + b.memberCount, 0)

		// Updates the bot's status
		const activities = [
			{
				name: `Avenger's server | ${GuildCount} servers | ${UserCount} users!`,
				type: 'WATCHING',
			},
			{ name: `Avenger's Dashboard ${bot.config.websiteURL}`, type: 'WATCHING' },
		]

		// Update presence
		bot.user.setPresence({ status: 'online', activity: activities[0] })

		let activity = 1

		// Update activity every 30 seconds
		setInterval(() => {
			activities[2] = {
				name: `@${bot.user.username} support | ${GuildCount} servers`,
				type: 'PLAYING',
			}
			activities[3] = {
				name: `@${bot.user.username} invite | ${GuildCount} servers`,
				type: 'PLAYING',
			}
			activities[4] = {
				name: `@${bot.user.username} help | ${GuildCount} servers`,
				type: 'PLAYING',
			}
			activities[5] = { name: `${GuildCount} Servers!`, type: 'LISTENING' }
			activities[6] = { name: `${UserCount} Users!`, type: 'LISTENING' }
			activities[7] = {
				name: `${GuildCount} servers with ${UserCount} users!`,
				type: 'COMPETING',
			}
			if (activity > 7) activity = 0
			bot.user.setActivity(activities[activity])
			activity++
		}, 30000)

		// LOG ready event
		bot.logger.ready(
			`${bot.user.tag}, ready to serve [${UserCount}] users in [${GuildCount}] servers.`
		)

		// Delete server settings on servers that removed the bot while it was offline
		const data = await GuildSchema.find({})
		if (data.length > bot.guilds.cache.size) {
			// A server kicked the bot when it was offline
			const guildCount = []
			// Get bot guild ID's
			for (let i = 0; i < bot.guilds.cache.size; i++) {
				guildCount.push([...bot.guilds.cache.values()][i].id)
			}
			// Now check database for bot guild ID's
			for (const guild of data) {
				if (!guildCount.includes(guild.guildID)) {
					bot.emit('guildDelete', { id: guild.guildID, name: guild.guildName })
				}
			}
		}

		bot.logger.ready('All guilds have been initialized.')

		// Every 1 minutes fetch new guild data
		setInterval(async () => {
			if (bot.config.debug) bot.logger.debug('Fetching guild settings (Interval: 1 minutes)')
			bot.guilds.cache.forEach(async (guild) => {
				await guild.fetchSettings()
			})
		}, 60000)

		// check for premium users
		const users = await userSchema.find({})
		for (let i = 0; i < users.length; i++) {
			const user = await bot.users.fetch(users[i].userID)
			// const userData = users[i];
			// user = { ...user, ...userData };
			user.premium = users[i].premium
			user.premiumSince = users[i].premiumSince ?? 0
			user.cmdBanned = users[i].cmdBanned
			user.rankImage = users[i].rankImage
				? Buffer.from(users[i].rankImage ?? '', 'base64')
				: ''
		}

		// enable time event handler (in case of bot restart)
		try {
			await require('../../helpers/TimedEventsManager')(bot)
		} catch (err) {
			console.log(err)
		}

		const embed = new MessageEmbed()
			.setAuthor(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
			.setTitle(bot.user.username + ' ' + 'is Online')
			.setDescription(
				`This bot is in ${GuildCount} servers containing ${bot.guilds.cache
					.map((g) => g)
					.reduce((a, b) => a + b.memberCount, 0)} users!`
			)
			.addField('Total Servers', `${GuildCount} Servers!`, true)
			.addField('Total Users', `${UserCount} Users!`, true)
			.addField('Total Channels', `${bot.channels.cache.size} Channels!`, true)
			.addField(
				'Total Memory',
				`${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
				true
			)
			.addField(
				'Versions',
				`**Node.js Version:** ${process.version}\n**Discord.js Version:** v${version}`,
				true
			)
			.setTimestamp()
			.setFooter(bot.user.id)
		const ReadyChannel = await bot.channels.fetch(bot.config.SupportServer.ReadyChannel)
		if (ReadyChannel) bot.addEmbed(ReadyChannel.id, [embed])
	}
}

module.exports = Ready
