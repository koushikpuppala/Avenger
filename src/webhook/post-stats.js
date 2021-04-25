/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
// Dependencies
const logger = require('../utils/logger'),
	AutoPoster = require('topgg-autoposter'),
	BoatsClient = require('boats.js'),
	BotList = require('botlist.space'),
	fetch = require('node-fetch'),
	BBL = require('bbl-api');

module.exports = bot => {

	// Post Server Count to Top.gg!

	const ap = AutoPoster(bot.config.DiscordBotLists.DiscordBotListsAPI_Key, bot);

	ap.on('posted', () => {
		logger.posted('Posted stats to Top.gg!');
	});

	// Post Server Count to Discord.boats!

	const Boats = new BoatsClient(`${bot.config.DiscordBotLists.DiscordBoatAPI_Key}`, 'v2');
	const SERVER_COUNT = bot.guilds.cache.size;

	Boats.postStats(SERVER_COUNT, `${bot.config.botClient}`).then(() => {
		logger.posted('Successfully updated server count on DiscordBoat.');
	}).catch(err => {
		logger.error(err);
	});

	// Post Server Count to Discordlists100.xyz!

	const requestOptions = {
		method: 'POST',
		headers: {
			'authorization': bot.config.DiscordBotLists.DiscordLists100API_Key,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ 'server_count': `${bot.guilds.cache.size}` }),
		// Replace this number with the server count
	};

	fetch('https://discordlists100.xyz/api/auth/stats/775412494235729960', requestOptions)
	// Check the table above for url
		.then(response => response.text())
		.then(console.log)
		.catch(console.error);

	// Post Server Count to botlist.space

	const BotListclient = new BotList.Client({ id: `${bot.config.botClient}`, botToken: `${bot.config.DiscordBotLists.BotlistspaceAPI_Key}` });

	BotListclient.postServerCount(SERVER_COUNT)
		.then((_bot) => {
			logger.posted('Successfully updated server count on Botlist.');
		}).catch((error) => {
			logger.error(error);
		});

	// Post Server Count to bladebotlist

	const BBLclient = new BBL(
		`${bot.config.botClient}`, // BOT_ID
		`${bot.config.DiscordBotLists.BladebotlistAPI_Key}`, // API_KEY, use bbl!key gen on the discord server
		{
			server_count: `${bot.guilds.cache.size}`,
			interval: 300000,
		});


	BBLclient.on('ready', () => logger.ready('Client is started !')); // when the module is loaded and ready to post data

	BBLclient.on('debug', (log) => logger.log(log));

	BBLclient.on('update', () => logger.posted('Stats updated !')); // autopost or manual post

	BBLclient.on('error', (error) => logger.error(`Something was wrong when the module has posted stats: ${error}`)); // complete reports about errors like invalid api key or bot id


	// Post Server Count to Botsfordiscord.com!

	const BODrequestOptions = {
		method: 'POST',
		headers: {
			'authorization': bot.config.DiscordBotLists.BotsfordiscordAPI_Key,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ 'server_count': `${bot.guilds.cache.size}` }),
		// Replace this number with the server count
	};

	fetch('https://botsfordiscord.com/api/bot/775412494235729960', BODrequestOptions)
	// Check the table above for url
		.then(response => response.text())
		.then(console.log)
		.catch(console.error);
};
