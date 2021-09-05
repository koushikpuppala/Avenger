/* eslint-disable no-unused-vars */
const router = require('express').Router(),
	{ ReportSchema } = require('../database/models');

module.exports = (bot, renderTemplate) => {

	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Report Submit Page',
				DESCRIPTION: 'This is the page for submitting report for Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/report',
			};
			renderTemplate(req, res, '200', 'Report.ejs', data);
		})
		.post('/', (req, res) => {
			const report = ReportSchema({
				UserName: req.body.UserName,
			});
			report.save(report, (err, collection) => {
				if (err) {
					res.send(err);
				} else {
					const data = {
						TITLE: 'Avengers Assemble',
						DESCRIPTION: '',
						KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
						FAVICON: '/img/A.webp',
						CANONICAL: 'https://avengers-assemble.tech/',
					};
					renderTemplate(req, res, '200', 'Submit.ejs', data);
				}
			});
		});

	return router;
};
