const Discord = require('discord.js');
const client = new Discord.Client();

module.exports.isAuthorized = async (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
};

module.exports.inGuild = async (req, res, next) => {
	const server = client.guilds.cache.get('775411681714503680');
	if (server.members.cache.find(req.user.discordId)) {
		console.log('User is in Server');
		next();
	} else {
		console.log('User is not in Server');
		res.redirect('/');
	}
};