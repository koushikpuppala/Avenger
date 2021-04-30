/* eslint-disable no-unused-vars */
// Dependencies
const Client = require('./base/Avenger.js');
require('./structures');
const bot = new Client({ partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'], fetchAllMembers: true, ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'GUILD_VOICE_STATES'] } });
const { promisify } = require('util');
const fs = require('fs');
const readdir = promisify(require('fs').readdir);
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = bot.config.Port;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./structures/discordstrategy');
const MONGO_DB = bot.config.MongoDBURl;
const path = require('path');
const mongoose = require('mongoose');
const Store = require('connect-mongo');
const UserSchema = require('./database/models/DiscordUser');
const SECRET = bot.config.JwtSecret;
const fetch = require('node-fetch');
const csrf = require('csurf');

// Routes
const HomeRoute = require('./routes/home');
const AuthRoute = require('./routes/auth');
const StaffRoute = require('./routes/staff');
const PartnerRoute = require('./routes/partner');
const ServerinfoRoute = require('./routes/server-info');
const MusicsdjRoute = require('./routes/musics_dj');
const AvengerRoute = require('./routes/avenger');
const SitemapRoute = require('./routes/sitemap');

// set up rate limiter: maximum of five requests per minute
const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
	// 1 minute
	windowMs: 1 * 60 * 1000,
	max: 5,
});

// apply rate limiter to all requests
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(csrf({ cookie: true }));
app.use(session({
	secret: SECRET,
	cookie: {
		maxAge: 1000 * 60 * 60,
	},
	saveUninitialized: false,
	resave: false,
	name: 'Avengers Assemble',
	store: Store.create({
		mongoUrl: `${MONGO_DB}`,
	}),
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware Routes
app.use('/', HomeRoute);
app.use('/auth', AuthRoute);
app.use('/staff', StaffRoute);
app.use('/partner', PartnerRoute);
app.use('/server-info', ServerinfoRoute);
app.use('/musics_dj', MusicsdjRoute);
app.use('/avenger', AvengerRoute);
app.use('/sitemap.xml', SitemapRoute);

app.get('/support', (req, res) => {
	res.render('Global/Server_Invite');
});

app.get('/arc-sw.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/validations/arc-sw.js'));
});

// Load commands
(async () => {
	// load commands
	const cmdFolders = await readdir('./src/commands/');
	cmdFolders.forEach(async (dir) => {
		const commandsFile = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));
		if (bot.config.disabledPlugins.includes(dir)) return;
		const commands = await readdir('./src/commands/' + dir + '/');
		bot.logger.log(`=-=-=-=-=-=-=- Loading ${dir} command(s): ${commandsFile.length} -=-=-=-=-=-=-=`);
		commands.forEach((cmd) => {
			if (bot.config.disabledCommands.includes(cmd.replace('.js', ''))) return;
			const resp = bot.loadCommand('./commands/' + dir, cmd);
			if (resp) bot.logger.error(resp);
		});
	});

	// load events
	const evtFiles = await readdir('./src/events/');
	bot.logger.log(`=-=-=-=-=-=-=- Loading events(s): ${evtFiles.length} -=-=-=-=-=-=-=`);
	evtFiles.forEach(file => {
		delete require.cache[file];
		const { name } = path.parse(file);
		try {
			const event = new (require(`./events/${file}`))(bot, name);
			bot.logger.log(`Loading Event: ${name}`);
			bot.on(name, (...args) => event.run(bot, ...args));
		} catch (err) {
			bot.logger.error(`Failed to load Event: ${name} error: ${err.message}`);
		}
	});

	// Audio player
	try {
		require('./base/Audio-Manager')(bot);
	} catch (e) {
		bot.logger.error(e);
	}

	// Connect bot to database
	bot.mongoose.init(bot);

	// load up adult site block list
	bot.fetchAdultSiteList();

	// Connect bot to discord API
	const token = bot.config.token;
	bot.login(token).catch(e => bot.logger.error(e.message));

	let count = 0;
	let invcount = 0;
	let user = 0;
	let rounds = 0;

	setInterval(function() {
		const database = JSON.parse(fs.readFileSync('./src/link.json', 'utf8'));
		count = 0;
		invcount = 0;
		user = database.length;
		rounds++;

		database.forEach(m => {
			m.link.forEach(s => {
				count++;

				fetch(s).catch(err => {
					invcount++;
				});
			});
		});
		bot.logger.ready('Interval :)');
	}, 240000);

	// Connect bot to Dashboard
	app.listen(PORT, function() {
		() => {
			bot.logger.ready(`Dashboard running on : \x1b[34m\x1b[4mhttps://localhost:${PORT}\x1b[0m`);
		};
	});

	process.on('unhandledRejection', err => {
		bot.logger.error(`Unhandled promise rejection: ${err.message}.`);

		// show full error if debug mode is on
		if(bot.config.debug) console.log(err);
	});
})();
