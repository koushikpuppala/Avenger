const router = require('express').Router(),
	path = require('path');

module.exports = (bot) => {

	router
		.get('/', (req, res) => {
			res.sendFile(path.join(__dirname, '../scripts/robots.txt'));
		});

	return router;
};
