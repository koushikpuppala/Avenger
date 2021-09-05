/* eslint-disable no-unused-vars */
const router = require('express').Router();

module.exports = (bot, renderTemplate) => {

	router
		.all('*', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | 404 Not Found',
				DESCRIPTION: 'This is an 404 Error page of Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/*',
			};
			renderTemplate(req, res, '404', '404.ejs', data);
		});

	return router;
};
