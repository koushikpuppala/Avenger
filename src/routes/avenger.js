const router = require('express').Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/', isAuthorized, (req, res) => {
	res.render('Clusters/Avenger', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avengers Assemble | Avenger',
		DESCRIPTION: 'This is the page about my bot Avenger which is multi-purpose bot have so many type of commands fun, ecomony, moderation, etc..',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/avengers.webp',
		COMMANDS: 'Bot Commands',
		COMMANDS_LINK: '/avenger/commands',
		HOME: '/avenger',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '/',
	});
});

router.get('/commands', isAuthorized, (req, res) => {
	res.render('Commands/Avenger', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avenger | Commands',
		DESCRIPTION: 'In this page we will get full commands of Discord Bot Avenger',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/avengers.webp',
		HOME: '/avenger/commands',
		COMMANDS: '',
		COMMANDS_LINK: '',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '../',
	});
});

module.exports = router;