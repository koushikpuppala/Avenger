/* eslint-disable no-unused-vars */
const router = require('express').Router();
const PartnerSchema = require('../database/models/PartnerShip');
const { check, validationResult } = require('express-validator');

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/application', isAuthorized, (req, res) => {
	res.render('Components/Partner_Application', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avengers Assemble | Partner Application',
		DESCRIPTION: 'This is the Partner application form for Avengers Assemble Discord server',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/A.webp',
		OTHER_URL: '/partner',
		OTHER: 'Partner Servers',
		COMPONENTS: 'Server Staff',
		MEMBER: 'Staff Members',
		MEMBER_URL: '/staff',
		APPLICATION: 'Staff Application',
		APPLICATION_URL: '/staff/application',
		HOME: '/partner/application',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '../',
	});
});

router.post('/application', [
	check('GuildId').custom(value => {
		return PartnerSchema.findOne({ GuildId: value, VerifiedServer: false }).then(user => {
			if (user) {
				return Promise.reject('Already your server has been submitted partner application wait untill it get verified or contact Owner but do not spam.');
			}
		});
	}),
	check('GuildId').custom(value => {
		return PartnerSchema.findOne({ GuildId: value, VerifiedServer: true }).then(user => {
			if (user) {
				return Promise.reject('Already your server is partner server with Avengers Assemble.');
			}
		});
	}),
	check('VanityURL').custom(value => {
		return PartnerSchema.findOne({ VanityURL: value }).then(user => {
			if (user) {
				return Promise.reject('Already this Vanity URL is present pick another Vanity URL ');
			}
		});
	}),
	check('IsOwner').custom(value => {
		if (value != 'Yes') {
			return Promise.reject('You should be the owner of the server');
		}
	}),
], (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const alert = errors.array();
		res.render('Components/Partner_Application', {
			username: req.user.username,
			discordId: req.user.discordId,
			email: req.user.email,
			avatar: req.user.avatar,
			TITLE: 'Avengers Assemble | Partner Application',
			DESCRIPTION: 'This is the Partner application form for Avengers Assemble Discord server',
			KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
			FAVICON: '../img/A.webp',
			OTHER_URL: '/partner',
			OTHER: 'Partner Servers',
			COMPONENTS: 'Server Staff',
			MEMBER: 'Staff Members',
			MEMBER_URL: '/staff',
			APPLICATION: 'Staff Application',
			APPLICATION_URL: '/staff/application',
			HOME: '/partner/application',
			RANDOM: 'Server info',
			RANDOM_LINK: '/server-info',
			EXTRA: '../',
			alert,
		});
	} else {
		const partner = PartnerSchema({
			UserName: req.body.UserName,
			DiscordId: req.body.DiscordId,
			Email: req.body.Email,
			Name: req.body.Name,
			GuildId: req.body.GuildId,
			InviteLink: req.body.InviteLink,
			Description: req.body.Description,
			VanityURL: req.body.VanityURL,
			AboutGuild: req.body.AboutGuild,
			IsOwner: req.body.IsOwner,
			TermsAndConditions: req.body.TermsAndConditions,
		});
		partner.save(partner, (err, collection) => {
			if (err) {
				res.send(err);
			} else {
				req.logOut();
				res.render('submit', {
					TITLE: 'Avengers Assemble | Form Submit',
					DESCRIPTION: '',
					KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
					FAVICON: '../img/A.webp',
					HEADING: 'Your Appication is submitted Sucessfully and you have been logged out of session',
					HOME_LINK: '/',
					HOME: 'Return Login page',
					EXTRA: '../',
				});
			}
		});
	}
});
module.exports = router;