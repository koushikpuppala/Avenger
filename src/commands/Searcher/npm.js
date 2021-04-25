// Dependencies
const { MessageEmbed } = require('discord.js'),
	Command = require('../../structures/Command.js'),
	fetch = require('node-fetch');

module.exports = class NPM extends Command {
	constructor(bot) {
		super(bot, {
			name: 'npm',
			dirname: __dirname,
			aliases: ['npmpackage', 'npmpkg', 'nodepackagemanager'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Search the NPM Registry for a package information',
			usage: 'npm <package>',
			cooldown: 3000,
			examples: ['npm @koushikpuppala/koushikpuppala'],
		});
	}

	async run(bot, message, settings) {
		if (!message.args[0]) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		const body = await fetch(`https://registry.npmjs.com/${message.args[0]}`)
			.then((res) => {
				if(res.status === 404) throw 'No results found.';
				return res.json();
			});

		const version = body.versions[body['dist-tags'].latest];

		let deps = version.dependencies ? Object.keys(version.dependencies) : null;
		let maintainers = body.maintainers.map((user) => user.name);

		if(maintainers.length > 10) {
			const len = maintainers.length - 10;
			maintainers = maintainers.slice(0, 10);
			maintainers.push(`...${len} more.`);
		}

		if(deps && deps.length > 10) {
			const len = deps.length - 10;
			deps = deps.slice(0, 10);
			deps.push(`...${len} more.`);
		}

		const embed = new MessageEmbed()
			.setColor(0xff0000)
			.setTitle(`NPM - ${message.args[0]}`)
			.setURL(`https://npmjs.com/package/${message.args[0]}`)
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
			.setDescription([
				body.description || 'No Description.',
				`**Version:** ${body['dist-tags'].latest}`,
				`**License:** ${body.license}`,
				`**Author:** ${body.author ? body.author.name : 'Unknown'}`,
				`**Modified:** ${new Date(body.time.modified).toDateString()}`,
				`**Dependencies:** ${deps && deps.length ? deps.join(', ') : 'None'}`,
			].join('\n'));

		message.channel.send({ embed });
	}
};