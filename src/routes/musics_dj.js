/** @format */

const router = require('express').Router()

module.exports = (bot, renderTemplate) => {
	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Musics_DJ Bot Page',
				DESCRIPTION: 'This is page of Musics_DJ Discord bot of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/musics_dj',
			}
			renderTemplate(req, res, '200', 'Musics.ejs', data)
		})
		.get('/info', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble Musics_DJ Bot Info Page',
				DESCRIPTION:
					'This is page of Musics_DJ Discord bot info of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/musics_dj/info',
			}
			renderTemplate(req, res, '200', 'Musics_Info.ejs', data)
		})
		.get('/commands', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Musics_DJ Bot Commands Page',
				DESCRIPTION:
					'This is page of Musics_DJ Discord bot commands of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/musics_dj/commands',
			}
			renderTemplate(req, res, '200', 'Musics_Commands', data)
		})
		.get('/invite', (req, res) => {
			res.redirect(
				'https://discord.com/oauth2/authorize?client_id=772133876813922314&permissions=305626464&redirect_uri=https%3A%2F%2Fdiscord.gg%2FMsJ99j5Bcv&response_type=code&scope=connections%20guilds.join%20identify%20bot'
			)
		})
		.get('/vote', (req, res) => {
			res.redirect('https://top.gg/bot/772133876813922314')
		})

	return router
}
