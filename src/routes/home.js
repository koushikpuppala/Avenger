const router = require('express').Router();

function isAuthorized(req, res, next) {
	if (req.user) {
		res.redirect('/server-info');
	} else {
		next();
	}
}

router.get('/', isAuthorized, (req, res) => {
	res.render('Webpack/Home', {
		TITLE: 'Avengers Assemble | Website, Support Server, Community',
		DESCRIPTION: 'This is the Support server for discord bots Musics_DJ(verified by discord) and Avenger.You can have Chatting, Code Sharing(expect my bots code) and lot of fun by making friends.',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: 'img/A.webp',
		EXTRA: '/',
	});
});

module.exports = router;