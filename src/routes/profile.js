const router = require('express').Router();

module.exports = (bot, renderTemplate) => {

	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | User Profile Page',
				DESCRIPTION: 'This is the page for User Profile of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/profile',
			};
			renderTemplate(req, res, '200', 'Profile.ejs', data);
		});

	return router;
};
