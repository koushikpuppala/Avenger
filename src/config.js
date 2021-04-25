require('dotenv').config();
const config = {
	ownerID: process.env.OWNER_ID,
	token: process.env.TOKEN,
	botClient: process.env.CLIENT_ID,
	botClientSecret: process.env.CLIENT_SECRET,
	botClientRedirect: process.env.CLIENT_REDIRECT,
	inviteLink: process.env.INVITELINK,
	// Lavalink connections
	LavaHost: process.env.LAVA_HOST,
	LavaPort: process.env.LAVA_PORT,
	LavaPass: process.env.LAVA_PASS,
	// URL to mongodb
	MongoDBURl: process.env.MONGODB_URL,
	// Port
	Port: process.env.PORT,
	// Cookies Secret
	JwtSecret: process.env.JWTTOKEN,
	// For looking up Twitch, Fortnite, Steam accounts
	api_keys: {
		// https://dev.twitch.tv/console/apps
		twitch: {
			clientID: process.env.TWITCH_ID,
			clientSecret: process.env.TWITCH_SECRET,
		},
		// https://fortnitetracker.com/site-api
		fortnite: process.env.FORTNITE_APIKEY,
		// https://api.ksoft.si/
		ksoft: process.env.KSOFT_APIKEY,
		// https://steamcommunity.com/dev
		steam: process.env.STEAM_APIKEY,
		// https://developer.spotify.com/documentation/web-api/
		spotify: {
			iD: process.env.SPOTIFY_ID,
			secret: process.env.SPOTIFY_SECRET,
		},
		// Your Ubisoft email and password (You don't need to enable anything)
		rainbow: {
			email: process.env.RAINDOW_EMAIL,
			password: process.env.RAINDOW_PASS,
		},
		// https://genius.com/developers
		genuis: process.env.GENUIS_APIKEY,
		// https://api.amethyste.moe/
		amethyste: process.env.AMETHYSTE_APIKEY,
	},
	// add plugins/commands here if you don't want them loaded in the bot.
	disabledCommands: ['steam', 'meme', 'reddit', 'announcement'],
	disabledPlugins: [],
	// This is a list of websites that the bot is on. API to interect with server/shard count
	DiscordBotLists: {
		// https://discord.boats/
		DiscordBoatAPI_Key: process.env.DISCORDBOAT_APIKEY,
		// https://botlist.space/
		BotlistspaceAPI_Key: process.env.BOTLISTSPACE_APIKEY,
		// https://top.gg/
		DiscordBotListsAPI_Key: process.env.DBL_APIKEY,
		// https://discordlists100.xyz
		DiscordLists100API_Key: process.env.DL100_APIKEY,
		// https://bladebotlist
		BladebotlistAPI_Key: process.env.BBL_APIKEY,
		// https://botsfordiscord.com/
		BotsfordiscordAPI_Key: process.env.BOD_APIKEY,
	},
	websiteURL: process.env.WEBSITE,
	// your support server
	SupportServer: {
		// Link to your support server
		link: process.env.SERVER_LINK,
		// Your support's server ID
		GuildID: process.env.GUILD_ID,
		// This for using the suggestion command on your server
		ModRole: process.env.MOD_ROLE,
		// What channel to post the suggestions
		SuggestionChannel: process.env.SUGGESTION_CHANNEL,
		// What channel to post the bug
		BugReportChannel: process.env.BUGREPORT_CHANNEL,
		// What channel where post of announcement there
		AnnouncementChannel: process.env.ANNOUNCEMENT_CHANNEL,
		// Where the bot will send Guild join messages to
		GuildCreateChannel: process.env.GUILDCREATE_CHANNEL,
		// Where the bot will send Guild leave messages to
		GuildDeleteChannel: process.env.GUILDDELETE_CHANNEL,
		// Where the bot will send Ready messages to
		ReadyChannel: process.env.READY_CHANNEL,
		// Where the hosting will take place
		HostChannel: process.env.HOST_CHANNEL,
		// My Support server Verification Channel
		VerifyChannel: process.env.VERIFY_CHANNEL,
		// My Support server Verification Role
		VerifyRole: process.env.VERIFY_ROLE,
	},
	// This is just so some commands can be ran in DM channels
	defaultSettings: {
		// default settings
		prefix: process.env.PREFIX,
		Language: process.env.LANGUAGE,
		plugins: ['Fun', 'Giveaway', 'Bot Dev', 'Guild', 'Image', 'Level', 'Misc', 'Moderation', 'Music', 'NSFW', 'Plugins', 'Recording', 'Searcher', 'Ticket', 'Utils'],
	},
	// Custom emojis, just for cosmetic (change these if you wish)
	emojis: {
		cross: '<a:cross:818394472224260118>',
		tick: '<a:tick:818394472563605554>',
	},
	// This will spam your console if you enable this but will help with bug fixing
	debug: false,
	// Sentry Deatiles
	dsn: process.env.SENTRY_DSN,
	environment: process.env.SENTRY_ENVIRONMENT,
};

module.exports = config;
