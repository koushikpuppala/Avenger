const { GuildSchema, PremiumSchema } = require('../database/models'),
	Event = require('../structures/Event'),
	{ MessageEmbed } = require('discord.js');
const { version } = require('discord.js');

module.exports = class Ready extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
		});
	}

	async run(bot) {
		// LOG ready event
		bot.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');
		bot.logger.log(`${bot.user.tag}, ready to serve [${bot.users.cache.size}] users in [${bot.guilds.cache.size}] servers.`, 'ready');
		bot.logger.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', 'ready');

		bot.appInfo = await bot.fetchApplication();

		// Load up audio player
		bot.manager.init(bot.user.id);

		setInterval(async () => {
			bot.appInfo = await bot.fetchApplication();
		}, 60000);

		// set up webserver
		try {
			require('../webhook/post-stats')(bot);
		} catch (err) {
			console.log(err);
		}

		// webhook manager
		setInterval(async () => {
			await require('../helpers/webhook-manager')(bot);
		}, 10000);

		// Updates the bot's status
		const activities = [
			{ name: `Avenger's server | ${bot.guilds.cache.size} servers | ${bot.users.cache.size} users!`, type: 'WATCHING' },
			{ name: `Avenger's Dashboard ${bot.config.websiteURL}`, type: 'WATCHING' },
		];

		// Update presence
		bot.user.setPresence({ status: 'online', activity: activities[0] });

		let activity = 1;

		// Update activity every 30 seconds
		setInterval(() => {
			activities[2] = { name: `@${bot.user.username} support | ${bot.guilds.cache.size} servers`, type: 'PLAYING' };
			activities[3] = { name: `@${bot.user.username} invite | ${bot.guilds.cache.size} servers`, type: 'PLAYING' };
			activities[4] = { name: `@${bot.user.username} help | ${bot.guilds.cache.size} servers`, type: 'PLAYING' };
			activities[5] = { name: `${bot.guilds.cache.size} Servers!`, type: 'LISTENING' };
			activities[6] = { name: `${bot.users.cache.size} Users!`, type: 'LISTENING' };
			activities[7] = { name: `${bot.guilds.cache.size} servers with ${bot.users.cache.size} users!`, type: 'COMPETING' };
			if (activity > 7) activity = 0;
			bot.user.setActivity(activities[activity]);
			activity++;
		}, 30000);


		// Check if any servers added the bot while offline
		bot.guilds.cache.forEach(async item => {
			await item.fetchGuildConfig();
			if (item.settings == null) {
				// new guild has been found
				bot.emit('guildCreate', item);
			}
		});

		// Delete server settings on servers that removed the bot while it was offline
		const data = await GuildSchema.find({});
		if (data.length > bot.guilds.cache.size) {
			// A server kicked the bot when it was offline
			const guildCount = [];
			// Get bot guild ID's
			for (let i = 0; i < bot.guilds.cache.size; i++) {
				guildCount.push(bot.guilds.cache.array()[i].id);
			}
			// Now check database for bot guild ID's
			for (let i = 0; i < data.length; i++) {
				if (!guildCount.includes(data[i].guildID)) {
					const guild = {
						id: `${data[i].guildID}`,
						name: `${data[i].guildName}`,
					};
					bot.emit('guildDelete', guild);
				}
			}
		}

		bot.logger.ready('All guilds have been initialized.');

		// Every 5 minutes fetch new guild data
		setInterval(async () => {
			if (bot.config.debug) bot.logger.debug('Fetching guild settings (Interval: 5 minutes)');
			bot.guilds.cache.forEach(async guild => {
				guild.fetchGuildConfig();
			});
		}, 300000);

		// check for premium users
		const premium = await PremiumSchema.find({});
		for (let i = 0; i < premium.length; i++) {
			if (premium[i].Type == 'user') {
				const user = await bot.getUser(premium[i].ID);
				if (user) user.premium = true;
			} else {
				const guild = bot.guilds.cache.get(premium[i].ID);
				if (guild) guild.premium = true;
			}
		}

		// enable time event handler (in case of bot restart)
		try {
			await require('../helpers/TimedEvents-manager')(bot);
		} catch (err) {
			console.log(err);
		}

		const embed = new MessageEmbed()
			.setAuthor(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
			.setTitle(bot.user.username + ' ' + 'is Online')
			.setDescription(`This bot is in ${bot.guilds.cache.size} servers containing ${bot.users.cache.size} users!`)
			.addField('Total Servers', `${bot.guilds.cache.size} Servers!`, true)
			.addField('Total Users', `${bot.users.cache.size} Users!`, true)
			.addField('Total Channels', `${bot.channels.cache.size} Channels!`, true)
			.addField('Total Memory', `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`, true)
			.addField('Versions', [
				`**Node.js Version:** ${process.version}`,
				`**Discord.js Version:** v${version}`,
			], true)
			.setTimestamp()
			.setFooter(bot.user.id);
		const ReadyChannel = bot.channels.cache.get(bot.config.SupportServer.ReadyChannel);
		if (ReadyChannel) require('../helpers/webhook-manager')(bot, ReadyChannel.id, embed);
	}
};
