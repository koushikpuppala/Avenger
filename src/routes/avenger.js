/** @format */

const router = require('express').Router()

module.exports = (bot, renderTemplate) => {
	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Avenger Bot Page',
				DESCRIPTION: 'This is page of Avengers Discord bot of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/avenger',
			}
			renderTemplate(req, res, '200', 'Avenger.ejs', data)
		})
		.get('/info', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Avengers Bot Info Page',
				DESCRIPTION: 'This is page of Avenger Discord bot info of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/avenger/info',
			}
			renderTemplate(req, res, '200', 'Avenger_Info.ejs', data)
		})
		.get('/commands', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Avenger Bot Commands Page',
				DESCRIPTION:
					'This is page of Avenger Discord bot commands of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/avenger/commands',
			}
			renderTemplate(req, res, '200', 'Avenger_Commands.ejs', data)
		})
		.get('/invite', (req, res) => {
			res.redirect(
				'https://discord.com/oauth2/authorize?client_id=775412494235729960&permissions=3757452671&redirect_uri=https%3A%2F%2Fdiscord.gg%2FMsJ99j5Bcv&response_type=code&scope=bot%20guilds.join%20applications.commands'
			)
		})
		.get('/vote', (req, res) => {
			res.redirect('https://top.gg/bot/775412494235729960')
		})

	return router
}
