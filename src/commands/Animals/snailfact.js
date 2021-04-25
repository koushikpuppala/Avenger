const fetch = require('node-fetch'),
	{ MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js');

module.exports = class Snailfact extends Command {
	constructor(bot) {
		super(bot, {
			name: 'snailfact',
			dirname: __dirname,
			aliases: ['snailfact'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Returns a snail fact',
			usage: 'snailfact',
			cooldown: 1000,
		});
	}
	async run(bot, message) {
		fetch('https://cat-fact.herokuapp.com/facts?animal_type=snail')
			.then((res) => res.json())
			.then(async (data) => {
				const fact = data.all[Math.floor(Math.random() * data.all.length)];

				const embed = new MessageEmbed(message)
					.setTitle('SNAIL FACT')
					.setDescription(fact.text);
				await message.channel.send(embed);
			});
	}
};
