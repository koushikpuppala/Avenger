module.exports = (bot) => {
	const path = require('path');
	const templateDir = path.resolve(__dirname, '../views');

	const renderTemplate = (req, res, status, template, data = {}) => {
		const baseData = {
			bot: bot,
			path: req.path,
			user: req.isAuthenticated() ? req.user : null,
		};
		res
			.status(`${status}`)
			.render(
				path.resolve(`${templateDir}${path.sep}${template}`),
				Object.assign(baseData, data),
			);
	};

	return renderTemplate;
};
