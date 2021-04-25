/* eslint-disable no-unused-vars */
const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
	failureRedirect: '/forbidden',
	successRedirect: '/server-info',
}));

router.get('/logout', (req, res) => {
	if (req.user) {
		req.logOut();
		res.redirect('/');
	} else {
		res.redirect('/');
	}
});

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

module.exports = router;