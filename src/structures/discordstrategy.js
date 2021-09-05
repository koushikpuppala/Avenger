/** @format */

module.exports = async (bot) => {
	const DiscordStrategy = require('passport-discord').Strategy
	const passport = require('passport')
	const { userSchema } = require('../database/models')

	passport.serializeUser((user, done) => {
		done(null, user)
	})

	passport.deserializeUser(async (id, done) => {
		const user = await userSchema.findById(id)
		if (user) {
			done(null, user)
		}
	})

	passport.use(
		new DiscordStrategy(
			{
				clientID: bot.config.botClient,
				clientSecret: bot.config.botClientSecret,
				callbackURL: bot.config.botClientRedirect,
				scope: ['identify', 'guilds', 'email', 'guilds.join'],
			},
			async (accessToken, refreshToken, profile, done) => {
				const { id, username, guilds, avatar, email, discriminator } = profile
				try {
					const user = await userSchema.findOneAndUpdate(
						{ userID: id },
						{
							userTag: `${username}#${discriminator}`,
							userAvatar: avatar,
							userGuilds: guilds,
							userName: username,
							userEmail: email,
						},
						{ new: true }
					)
					if (user) {
						done(null, user)
					} else {
						const newUser = await userSchema.create({
							userID: profile.id,
							userTag: `${username}#${discriminator}`,
							userName: profile.username,
							userGuilds: profile.guilds,
							userAvatar: profile.avatar,
							userEmail: profile.email,
						})
						const saveUser = await newUser.save()
						done(null, saveUser)
					}
				} catch (err) {
					console.log(err)
					done(err, null)
				}
			}
		)
	)

	return passport
}
