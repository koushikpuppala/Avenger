/* eslint-disable no-self-assign */
/* eslint-disable no-unused-vars */
const router = require('express').Router(),
	passport = require('passport');

module.exports = (app, bot, url) => {
	router
		.get('/', (req, res, next) => {
			if (req.session.backURL) {
				req.session.backURL = req.session.backURL;
			} else if (req.headers.referer) {
				const parsed = url.parse(req.headers.referer);
				if (parsed.hostname === app.locals.domain) {
					req.session.backURL = parsed.path;
				}
			} else {
				req.session.backURL = '/';
			}
			next();
		},
		passport.authenticate('discord'),
		);

	return router;
};
