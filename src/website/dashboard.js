/** @format */

module.exports = async (bot, renderTemplate, url) => {
	const express = require('express'),
		bodyParser = require('body-parser'),
		passport = require('passport'),
		session = require('express-session'),
		Store = require('connect-mongo'),
		path = require('path'),
		cors = require('cors'),
		app = express(),
		Port = bot.config.Port,
		Host = bot.config.Host,
		Secret = bot.config.JwtSecret,
		MongoDB = bot.config.MongoDBURl

	app.use(cors())
		.set('view engine', 'ejs')
		.set('views', path.join(__dirname, '/../views'))
		.use(express.static(path.join(__dirname, '/../public')))
		.use(bodyParser.json())
		.use(
			bodyParser.urlencoded({
				extended: true,
			})
		)
		.use(
			session({
				secret: Secret,
				cookie: {
					maxAge: 1000 * 60 * 60,
				},
				saveUninitialized: true,
				resave: true,
				name: 'Avengers Assemble',
				store: Store.create({
					mongoUrl: `${MongoDB}`,
				}),
			})
		)
		.use(passport.initialize())
		.use(passport.session())
		.use('/', require('../routes/home')(bot, renderTemplate))
		.use('/auth', require('../routes/auth')(bot, url))
		.use('/auth_failure', require('../routes/auth_failure')(bot, renderTemplate))
		.use('/login', require('../routes/login')(app, bot, url))
		.use('/bots', require('../routes/bots')(bot, renderTemplate))
		.use('/avenger', require('../routes/avenger')(bot, renderTemplate))
		.use('/musics_dj', require('../routes/musics_dj')(bot, renderTemplate))
		.use('/staff', require('../routes/staff')(bot, renderTemplate))
		.use('/partner', require('../routes/partner')(bot, renderTemplate))
		.use('/profile', require('../routes/profile')(bot, renderTemplate))
		.use('/report', require('../routes/report')(bot, renderTemplate))
		.use('/feedback', require('../routes/feedback')(bot, renderTemplate))
		.use('/sitemap.xml', require('../routes/sitemap')(bot))
		.use('/robots.txt', require('../routes/robots')(bot))
		.use('/arc-sw.js', require('../routes/arc')(bot))
		.use('/logout', require('../routes/logout')(bot))
		.use('*', require('../routes/404')(bot, renderTemplate))
		.listen(Port, Host, () => {
			bot.logger.ready(
				`Dashboard running on : \x1b[34m\x1b[4mhttp://localhost:${Port}\x1b[0m`
			)
		})

	return app
}
