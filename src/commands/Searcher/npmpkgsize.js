// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fetch = require('node-fetch');
const suffixes = ['Bytes', 'KB', 'MB', 'GB'];

function getBytes(bytes) {
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return (!bytes && '0 Bytes') || `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
}
module.exports = class NPMPkgSize extends Command {
	constructor(bot) {
		super(bot, {
			name: 'npmpkgsize',
			dirname: __dirname,
			aliases: ['pkgsize', 'npmsize'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Shows the install/publish size of a npm package.',
			usage: 'npmpkgsize <package>',
			cooldown: 3000,
			examples: ['npmpkgsize @koushikpuppala/koushikpuppala'],
		});
	}

	async run(bot, message, settings) {
		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		const { publishSize, installSize } = await fetch(`https://packagephobia.now.sh/api.json?p=${encodeURIComponent(message.args[0])}`)
			.then((res) => res.json());

		if(!publishSize && !installSize) return message.channel.send('That package doesn\'t exist.');

		const embed = new MessageEmbed()
			.setTitle(`NPM Package Size - ${message.args[0]}`)
			.setDescription(`**Publish Size:** ${getBytes(publishSize)}\n**Install Size:** ${getBytes(installSize)}`)
			.setFooter('Powered by packagephobia.now.sh')
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }));

		message.channel.send({ embed });
	}
};