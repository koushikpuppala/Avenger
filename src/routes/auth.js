/* eslint-disable no-unused-vars */
const router = require("express").Router(),
	passport = require("passport");

module.exports = (bot) => {
	router.get(
		"/",
		passport.authenticate("discord", {
			failureRedirect: "/auth_failure",
		}),
		(req, res) => {
			if (req.session.backURL) {
				const url = req.session.backURL;
				req.session.backURL = null;
				res.redirect(url);
			} else {
				res.redirect('/');
			}
		}
	);

	return router;
};
