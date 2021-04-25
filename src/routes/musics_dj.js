const router = require('express').Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/', isAuthorized, (req, res) => {
	res.render('Clusters/Music', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avengers Assemble | Musics_DJ',
		DESCRIPTION: 'This page is about my Musics_DJ Discord Bot which is made only for Purpose of playing music',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/music.webp',
		HOME: '/musics_dj',
		COMMANDS: 'Bot Commands',
		COMMANDS_LINK: '/musics_dj/commands',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '/',
	});
});

router.get('/commands', isAuthorized, (req, res) => {
	res.render('Commands/Music', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Musics_DJ | Commands',
		DESCRIPTION: 'In this page we will get full commands of Discord Bot Musics_DJ',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/music.webp',
		HOME: '/musics_dj/commands',
		COMMANDS: '',
		COMMANDS_LINK: '',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '../',
	});
});

router.get('/invites', isAuthorized, (req, res) => {
	res.render('Global/Music_Invite');
});

module.exports = router;