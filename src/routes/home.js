/**
 * /* eslint-disable no-unused-vars
 *
 * @format
 */

const router = require('express').Router(),
	{ ContactSchema } = require('../database/models')

module.exports = (bot, renderTemplate) => {
	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Discord Community, Bots Dashboard',
				DESCRIPTION:
					'This is the main page of Server Avengers Assemble which have two major bots Musics_DJ(Discord Verified) and Avenger(Under Discord Verification Process). You can have Lot of friends by joining the server and can share coding and can learn coding.',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/',
			}
			renderTemplate(req, res, '200', 'Home.ejs', data)
		})
		.post('/contact', (req, res) => {
			const contact = ContactSchema({
				UserName: req.body.UserName,
				Email: req.body.Email,
				DiscordId: req.body.DiscordId,
				Name: req.body.Name,
				Subject: req.body.Subject,
				Message: req.body.Message,
			})
			contact.save(contact, (err, collection) => {
				if (err) {
					res.send(err)
				} else {
					const data = {}
					renderTemplate(req, res, '200', 'Submit.ejs', data)
				}
			})
		})
		.get('/support', (req, res) => {
			res.redirect('https://discord.gg/MsJ99j5Bcv')
		})

	return router
}
