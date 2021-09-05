const router = require('express').Router();

module.exports = (bot, renderTemplate) => {
	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Discord Server Bots Page',
				DESCRIPTION: 'This is an Discord Bots Page of of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/bots',
			};
			renderTemplate(req, res, '200', 'Bots.ejs', data);
		});

	return router;
};
