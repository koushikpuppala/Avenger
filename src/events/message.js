// Dependencies
const { GlobalBanSchema } = require('../database/models'),
	{ MessageEmbed, Collection } = require('discord.js'),
	Event = require('../structures/Event');

module.exports = class Message extends Event {
	async run(bot, message) {
		// record how many messages the bot see
		bot.messagesSent++;

		// Should not respond to bots
		if (message.author.bot) return;

		// Get server settings
		const settings = (message.guild) ? message.guild.settings : bot.config.defaultSettings;
		if (Object.keys(settings).length == 0) return;

		// Check if bot was mentioned
		if (message.content == `<@!${bot.user.id}>`) {
			const embed = new MessageEmbed()
				.setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png' }))
				.setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
				.setDescription([
					`Hello, my name is ${bot.user.username}, and I'm a multi-purpose Discord bot, built to help you with all of your server problems and needs.`,
					`I've been online for ${bot.timeFormatter.getReadableTime(bot.uptime)}, helping ${bot.guilds.cache.size} servers and ${bot.users.cache.size} users with ${bot.commands.size} commands.`,
				].join('\n\n'))
				.addField('Useful Links:', [
					`[Add to server](${bot.config.inviteLink})`,
					`[Join support server](${bot.config.SupportServer.link})`,
					`[Website](${bot.config.websiteURL})`,
				].join('\n'));
			return message.channel.send(embed).catch(err => bot.logger.error(`Event: 'message' has error: ${err.message}.`));
		}

		// Verification Process for SupportServer
		if ((message.content.toLowerCase() === 'verify') && message.channel.id === bot.config.SupportServer.VerifyChannel) {
			if (!message.channel.permissionsFor(message.guild.me).serialize().SEND_MESSAGES) return console.error('The bot doesn\'t have the permission to send messages.\nRequired permission: SEND_MESSAGES');
			if (!message.channel.permissionsFor(message.guild.me).serialize().ADD_REACTIONS) {
				console.error('The bot doesn\'t have the permission to add reactions.\nRequired permission: `ADD_REACTIONS`');
				message.channel.send('The bot doesn\'t have the permission to add reactions.\nRequired permission: `ADD_REACTIONS`')
					.then(m => m.delete({ timeout: 20000 }));
				return;
			}
			if (!message.channel.permissionsFor(message.guild.me).serialize().MANAGE_MESSAGES) {
				console.error('The bot doesn\'t have the permission to delete messages.\nRequired permission: `MANAGE_MESSAGES`');
				message.channel.send('The bot doesn\'t have the permission to delete messages.\nRequired permission: `MANAGE_MESSAGES`')
					.then(m => m.delete({ timeout: 20000 }));
				return;
			}
			const messageRole = message.guild.roles.cache.find(role => role.id === bot.config.SupportServer.VerifyRole);
			if (messageRole == null) return;
			if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
				message.channel.send('The bot doesn\'t have the permission required to assign roles.\nRequired permission: `MANAGE_ROLES`')
					.then(m => m.delete({ timeout: 20000 }));
				return;
			}
			if (message.guild.me.roles.highest.comparePositionTo(messageRole) < 1) {
				message.channel.send('The position of this role is higher than the bot\'s highest role, it cannot be assigned by the bot.')
					.then(m => m.delete({ timeout: 20000 }));
				return;
			}
			if (messageRole.managed == true) {
				message.channel.send('This is an auto managed role, it cannot be assigned.')
					.then(m => m.delete({ timeout: 20000 }));
				return;
			}
			if (message.member.roles.cache.has(messageRole.id)) {
				message.channel.send(`You already have <@&${bot.config.SupportServer.VerifyRole}> role`)
					.then(m => m.delete({ timeout: 5000 }));
			}
			message.react('<a:tick:818394472563605554>');
			message.member.roles.add(messageRole)
				.then(() => message.delete({ timeout: 5000 }))
				.catch(error => {
					console.error(error.stack);
					message.channel.send(error.stack)
						.then(m => m.delete({ timeout: 20000 }));
				});
		}
		if ((message.content.toLowerCase() != 'verify') && message.channel.id === bot.config.SupportServer.VerifyChannel) {
			// Delete message
			message.react('<a:cross:818394472224260118>')
				.then(() => message.delete({ timeout : 5000 }));
			message.channel.send('No, msg are allowed in this channel to get verify send message `verify` so that yo can verify')
				.then(m => m.delete({ timeout: 5000 }));
		}

		// Check if the message was @someone
		if (['@someone', '@person'].includes(message.content)) {
			if (message.channel.type == 'dm') return message.channel.error(settings.Language, 'EVENTS/GUILD_COMMAND_ERROR');
			return message.channel.send({ embed:{ color: 'RANDOM', description:`Random user selected: ${message.guild.members.cache.random().user}.` } });
		}

		// Check if message was a command
		const args = message.content.split(' ');
		if ([settings.prefix, `<@!${bot.user.id}>`].find(p => message.content.startsWith(p))) {
			const command = args.shift().slice(settings.prefix.length).toLowerCase();
			let cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
			if (!cmd && message.content.startsWith(`<@!${bot.user.id}>`)) {
				// check to see if user is using mention as prefix
				cmd = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
				args.shift();
				if (!cmd) return;
			} else if (!cmd) {
				return;
			}
			message.args = args;

			// make sure user is not on banned list
			const banned = await GlobalBanSchema.findOne({
				userID: message.author.id,
			}, async (err, res) => {
				if (err) bot.logger.error(err.message);

				// This is their first warning
				if (res) {
					return true;
				} else {
					return false;
				}
			});
			if (banned) return message.channel.send('You are banned from using command');


			// Make sure guild only commands are done in the guild only
			if (message.guild && cmd.guildOnly)	return message.channel.error(settings.Language, 'EVENTS/GUILD_COMMAND_ERROR').then(m => m.delete({ timeout: 5000 }));

			// Check to see if the command is being run in a blacklisted channel
			if ((settings.CommandChannelToggle) && (settings.CommandChannels.includes(message.channel.id))) {
				if (message.deletable) message.delete();
				return message.channel.error(settings.Language, 'EVENTS/BLACKLISTED_CHANNEL', message.author.tag).then(m => m.delete({ timeout:5000 }));
			}

			// Make sure NSFW commands are only being run in a NSFW channel
			if ((message.channel.type != 'dm') && ((!message.channel.nsfw) && (cmd.conf.nsfw))) {
				if (message.deletable) message.delete();
				return message.channel.error(settings.Language, 'EVENTS/NOT_NSFW_CHANNEL').then(m => m.delete({ timeout:5000 }));
			}

			// Check if the command is from a disabled plugin
			if (!settings.plugins.includes(cmd.help.category) && cmd.help.category != 'Host') return;

			// Make sure user does not have access to ownerOnly commands
			if (cmd.conf.ownerOnly && !bot.config.ownerID.includes(message.author.id)) return message.channel.send('Nice try').then(m => m.delete({ timeout:5000 }));

			// Check if command is disabled
			if ((message.channel.type != 'dm') && (settings.DisabledCommands.includes(cmd.name))) return;

			// Check to see if user is in 'cooldown'
			if (!bot.cooldowns.has(cmd.help.name)) {
				bot.cooldowns.set(cmd.help.name, new Collection());
			}

			const now = Date.now();
			const timestamps = bot.cooldowns.get(cmd.help.name);
			const cooldownAmount = (cmd.conf.cooldown || 3000);

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.channel.error(settings.Language, 'EVENTS/COMMAND_COOLDOWN', timeLeft.toFixed(1)).then(m => m.delete({ timeout:5000 }));
				}
			}

			// run the command
			bot.commandsUsed++;
			if (bot.config.debug) bot.logger.debug(`Command: ${cmd.help.name} was ran by ${message.author.tag}${!message.guild ? '' : ` in guild: ${message.guild.id}`}.`);
			cmd.run(bot, message, settings);
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		} else if (message.guild) {
			if (settings.plugins.includes('Moderation')) {
				try {
					const check = require('../helpers/auto-moderation').run(bot, message, settings);
					// This makes sure that if the auto-mod punished member, level plugin would not give XP
					if (settings.plugins.includes('Level') && check) return require('../helpers/level-system').run(bot, message, settings);
				} catch (err) {
					bot.logger.error(`Event: 'message' has error: ${err.message}.`);
				}
			} else if (settings.plugins.includes('Level')) {
				require('../helpers/level-system').run(bot, message, settings);
			}
		}
	}
};
