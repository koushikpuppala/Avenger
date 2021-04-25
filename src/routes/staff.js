/* eslint-disable no-unused-vars */
const router = require('express').Router();
const StaffApplicationSchema = require('../database/models/StaffApplication');
const { check, validationResult } = require('express-validator');

function isAuthorized(req, res, next) {
	if (req.user) {
		next();
	} else {
		res.redirect('/');
	}
}

router.get('/application', isAuthorized, (req, res) => {
	res.render('Components/Staff_Application', {
		username: req.user.username,
		discordId: req.user.discordId,
		email: req.user.email,
		avatar: req.user.avatar,
		TITLE: 'Avengers Assemble | Staff Application',
		DESCRIPTION: 'This is the Staff application form for Avengers Assemble Discord server',
		KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
		FAVICON: '../img/A.webp',
		OTHER_URL: '/staff',
		OTHER: 'Staff Members',
		COMPONENTS: 'Partners',
		MEMBER: 'Partner Server',
		MEMBER_URL: '/partner',
		APPLICATION: 'PartnerShip Application',
		APPLICATION_URL: '/partner/application',
		HOME: '/staff/application',
		RANDOM: 'Server info',
		RANDOM_LINK: '/server-info',
		EXTRA: '../',
	});
});

router.post('/application', [
	check('DiscordId').custom(value => {
		return StaffApplicationSchema.findOne({ DiscordId: value }).then(user => {
			if (user) {
				return Promise.reject('Already you have submitted your Application, So be patient and check your E-MailID of Discord Account and check Discord DM you will get a message from the owner.If it got Accepted or Rejected along with the reason.');
			}
		});
	}),
], (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const alert = errors.array();
		res.render('Components/Staff_Application', {
			username: req.user.username,
			discordId: req.user.discordId,
			email: req.user.email,
			avatar: req.user.avatar,
			TITLE: 'Avengers Assemble | Staff Application',
			DESCRIPTION: 'This is the Staff application form for Avengers Assemble Discord server',
			KEYWORDS: 'Avengers Assembele , Musics_DJ , Avenger , Discord , Discord Bot , Developers',
			FAVICON: '../img/A.webp',
			OTHER_URL: '/staff',
			OTHER: 'Staff Members',
			COMPONENTS: 'Partners',
			MEMBER: 'Partner Server',
			MEMBER_URL: '/partner',
			APPLICATION: 'PartnerShip Application',
			APPLICATION_URL: '/partner/application',
			HOME: '/staff/application',
			RANDOM: 'Server info',
			RANDOM_LINK: '/server-info',
			EXTRA: '../',
			alert,
		});
	} else {
		const staff = StaffApplicationSchema({
			UserName: req.body.UserName,
			Email: req.body.Email,
			DiscordId: req.body.DiscordId,
			Name: req.body.Name,
			Abilities: req.body.Abilities,
			ReasonToPickYou: req.body.ReasonToPickYou,
			ReasonToBeStaff: req.body.ReasonToBeStaff,
			HelpingHands: req.body.HelpingHands,
			AboutYou: req.body.AboutYou,
			TimeZone: req.body.TimeZone,
			Country: req.body.Country,
			Languages: req.body.Languages,
			WorkingHours: req.body.WorkingHours,
			Spamming: req.body.Spamming,
			Age: req.body.Age,
			Gender: req.body.Gender,
			StaffWorked: req.body.StaffWorked,
			AbusingPermissions: req.body.AbusingPermissions,
			TermsAndConditions: req.body.TermsAndConditions,
		});
		staff.save(staff, (err, collection) => {
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