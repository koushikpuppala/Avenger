const router = require('express').Router();

module.exports = (bot, renderFile) => {

	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Feedback Page',
				DESCRIPTION: 'This is an Feedback Page for this website',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/feedback',
			};
			renderFile(req, res, '200', 'Feedback.ejs', data);
		});

	return router;
};
