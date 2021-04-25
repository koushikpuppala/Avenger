const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const UserSchema = require('../database/models/DiscordUser');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await UserSchema.findById(id);
	if (user) {
		done(null, user);
	}
});

passport.use(new DiscordStrategy({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: process.env.CLIENT_REDIRECT,
	scope: ['identify', 'guilds', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
	const { id, username, guilds, avatar, email, discriminator } = profile;
	try {
		const user = await UserSchema.findOneAndUpdate({ discordId: id }, {
			discordTag: `${username}#${discriminator}`, avatar, guilds, username, email,
		}, { new: true });
		if (user) {
			done(null, user);
		} else {
			const newUser = await UserSchema.create({

				discordId: profile.id,
				discordTag: `${username}#${discriminator}`,
				username: profile.username,
				guilds: profile.guilds,
				avatar: profile.avatar,
				email: profile.email,
			});
			const saveUser = await newUser.save();
			done(null, saveUser);
		}
	} catch (err) {
		console.log(err);
		done(err, null);
	}
}));