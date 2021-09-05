const router = require('express').Router();

module.exports = (bot, renderTemplate) => {

	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Auth Failure',
				DESCRIPTION: 'This is an Auth Failure page of Discord Login in Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/auth_failure',
			};
			renderTemplate(req, res, '200', 'Failure.ejs', data);
		});

	return router;
};
