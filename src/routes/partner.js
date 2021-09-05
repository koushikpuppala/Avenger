/* eslint-disable no-unused-vars */
const router = require('express').Router(),
	{ PartnerSchema } = require('../database/models'),
	{ check, validationResult } = require('express-validator');

module.exports = (bot, renderTemplate) => {

	router
		.get('/', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Partner Page',
				DESCRIPTION: 'This is the partner data page of Avengers Assemble server',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/partner',
			};
			renderTemplate(req, res, '200', 'Partner.ejs', data);
		})
		.get('/servers', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Partner Servers Page',
				DESCRIPTION: 'This is the page for partner servers of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/partner/servers',
			};
			renderTemplate(req, res, '200', 'Partner_Servers.ejs', data);
		})
		.get('/application', (req, res) => {
			const data = {
				TITLE: 'Avengers Assemble | Partner Application Page',
				DESCRIPTION: 'This is the page for partner application of Server Avengers Assemble',
				KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
				FAVICON: '/img/A.webp',
				CANONICAL: 'https://avengers-assemble.tech/partner/application',
			};
			renderTemplate(req, res, '200', 'Partner_Application.ejs', data);
		})
		.post('/application', [
			check('GuildId').custom(async value => {
				const user = await PartnerSchema.findOne({ GuildId: value, VerifiedServer: false });
				if (user) {
					return Promise.reject('Already your server has been submitted partner application wait until it get verified or contact Owner but do not spam.');
				}
			}),
			check('GuildId').custom(async value => {
				const user = await PartnerSchema.findOne({ GuildId: value, VerifiedServer: true });
				if (user) {
					return Promise.reject('Already your server is partner server with Avengers Assemble.');
				}
			}),
			check('VanityURL').custom(async value => {
				const user = await PartnerSchema.findOne({ VanityURL: value });
				if (user) {
					return Promise.reject('Already this Vanity URL is present pick another Vanity URL ');
				}
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
				const data = {
					alert,
					TITLE: 'Avengers Assemble | Partner Application Page with Errors',
					DESCRIPTION: 'This is the page for partner application of Server Avengers Assemble',
					KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
					FAVICON: '/img/A.webp',
					CANONICAL: 'https://avengers-assemble.tech/partner/application',
				};
				renderTemplate(req, res, '200', 'Partner_Application.ejs', data);
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
						const data = {
							TITLE: 'Avengers Assemble',
							DESCRIPTION: '',
							KEYWORDS: 'Avengers Assemble, Musics_DJ, Avenger, Discord, Discord Bot, Developers',
							FAVICON: '/img/A.webp',
							CANONICAL: 'https://avengers-assemble.tech/',
						};
						renderTemplate(req, res, '200', 'Submit.ejs', data);
					}
				});
			}
		});

	return router;
};
