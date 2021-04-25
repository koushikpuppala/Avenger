/* eslint-disable no-unused-vars */
const router = require('express').Router();
const ContactSchema = require('../database/models/Contact');

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/', isAuthorized, (req, res) => {
	res.render('Webpack/Server_Info', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avengers Assemble | Server info',
		DESCRIPTION: 'This is the Support server for discord bots Musics_DJ(verified by discord) and Avenger.You can have Chatting, Code Sharing(expect my bots code) and lot of fun by making friends.',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: 'img/A.webp',
		COMMANDS: '',
		COMMANDS_LINK: '',
		HOME: '/server-info',
		RANDOM: 'Contact',
		RANDOM_LINK: '#contact',
		EXTRA: '',
	});
});

router.post('/', (req, res) => {
	const contact = ContactSchema({
		UserName: req.body.UserName,
		Email: req.body.Email,
		DiscordId: req.body.DiscordId,
		Name: req.body.Name,
		Subject: req.body.Subject,
		Message: req.body.Message,
	});

	contact.save(contact, (err, collection) => {
		if (err) {
			res.sendStatus(400);
		} else {
			res.render('submit', {
				TITLE: 'Avengers Assemble | Form Submit',
				DESCRIPTION: '',
				KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
				FAVICON: '../img/A.webp',
				HEADING: 'Your Form submitted Sucessfully',
				HOME_LINK: '/server-info',
				HOME: 'Return Back',
				EXTRA: '../',
			});
		}
	});
});

module.exports = router;