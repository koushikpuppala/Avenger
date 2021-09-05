/* eslint-disable no-unused-vars */
const router = require('express').Router();

module.exports = (bot) => {

	router.get('/', (req, res) => {
		req.session.destroy(() => {
			req.logout();
			res.redirect('/');
		});
	});

	return router;
};
