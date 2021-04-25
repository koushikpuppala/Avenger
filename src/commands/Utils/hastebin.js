/* eslint-disable no-unused-vars */
// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fetch = require('node-fetch');

function getCodeBlock(txt) {
	const match = /^```(\S*)\n?([^]*)\n?```$/.exec(txt);
	if (!match) return { lang: null, code: txt };
	if (match[1] && !match[2]) return { lang: null, code: match[1] };
	return { lang: match[1], code: match[2] };
}

module.exports = class Hastebin extends Command {
	constructor(bot) {
		super(bot, {
			name: 'hastebin',
			dirname: __dirname,
			aliases: ['hb'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Upload some code to hastebin.',
			usage: 'hastebin <code>',
			cooldown: 2000,
		});
	}
	async run(bot, message, settings) {
		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		const { code, lang } = getCodeBlock(message.rawArgs);

		const { key } = await fetch('https://hastebin.com/documents', {
			method: 'POST',
			body: code,
		})
			.then((res) => {
				if(!res.ok) throw `Something went wrong with Hastebin. Try again later. (Status: ${res.status} ${res.statusText})`;
				return res.json();
			});

		return message.channel.send(`Hastebin-ified: https://hastebin.com/${key}${lang ? `.${lang}` : ''}`);
	}

};