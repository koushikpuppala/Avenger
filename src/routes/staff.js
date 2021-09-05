/** @format */

const router = require('express').Router(),
	{ StaffApplicationSchema } = require('../database/models'),
	{ check, validationResult } = require('express-validator')

module.exports = (bot, renderTemplate) => {
	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble',
				DESCRIPTION: '',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/',
			}
			renderTemplate(req, res, '200', 'Staff.ejs', data)
		})
		.get('/members', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble',
				DESCRIPTION: '',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/',
			}
			renderTemplate(req, res, '200', 'Staff_Members.ejs', data)
		})
		.get('/application', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble',
				DESCRIPTION: '',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/',
			}
			renderTemplate(req, res, '200', 'Staff_Application.ejs', data)
		})
		.post(
			'/application',
			[
				check('DiscordId').custom(async (value) => {
					const user = await StaffApplicationSchema.findOne({ DiscordId: value })
					if (user) {
						return Promise.reject(
							'Already you have submitted your Application, So be patient and check your E-MailID of Discord Account and check Discord DM you will get a message from the owner.If it got Accepted or Rejected along with the reason.'
						)
					}
				}),
			],
			(req, res) => {
				const errors = validationResult(req)
				if (!errors.isEmpty()) {
					const alert = errors.array()
					const data = {
						alert,
						TITLE: 'Avengers Assemble',
						DESCRIPTION: '',
						KEYWORDS:
							'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
						FAVICON: '/img/A.webp',
						CANONICAL: 'https://avengers-assemble.tech/',
					}
					renderTemplate(req, res, '200', 'Staff_Application.ejs', data)
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
					})
					staff.save(staff, (err, collection) => {
						if (err) {
							res.send(err)
						} else {
							const data = {
								TITLE: 'Avengers Assemble',
								DESCRIPTION: '',
								KEYWORDS:
									'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
								FAVICON: '/img/A.webp',
								CANONICAL: 'https://avengers-assemble.tech/',
							}
							renderTemplate(req, res, '200', 'Submit.ejs', data)
						}
					})
				}
			}
		)

	return router
}
