/* eslint-disable no-inline-comments */
// Dependecies
const path = require('path');

// Command structure
module.exports = class Command {
	constructor(bot, {
		name = null,
		guildOnly = false,
		dirname = false,
		aliases = new Array(),
		botPermissions = new Array(),
		userPermissions = new Array(),
		examples = new Array(),
		nsfw = false,
		ownerOnly = false,
		cooldown = 3000,
		description = '',
		usage = '',
	}) {
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)] : 'Other');
		this.conf = { guildOnly, userPermissions, botPermissions, nsfw, ownerOnly, cooldown };
		this.help = { name, category, aliases, description, usage, examples };
	}

	// eslint-disable-next-line no-unused-vars
	async run(...args) {
		throw new Error(`Command: ${this.help.name} does not have a run method`);
	}

	isURL(url) {
		if (!url) return false;
		const pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
    'localhost' + // OR localhost
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
			'i',
		); // fragment locator
		return pattern.test(url);
	}

	/**
	 * Gets member from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getMemberFromMention(message, mention) {
		if (!mention) return;
		const matches = mention.match(/^<@!?(\d+)>$/);
		if (!matches) return;
		const id = matches[1];
		return message.guild.members.cache.get(id);
	}

	/**
	 * Gets role from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getRoleFromMention(message, mention) {
		if (!mention) return;
		const matches = mention.match(/^<@&(\d+)>$/);
		if (!matches) return;
		const id = matches[1];
		return message.guild.roles.cache.get(id);
	}

	/**
	 * Gets text channel from mention
	 * @param {Message} message
	 * @param {string} mention
	 */
	getChannelFromMention(message, mention) {
		if (!mention) return;
		const matches = mention.match(/^<#(\d+)>$/);
		if (!matches) return;
		const id = matches[1];
		return message.guild.channels.cache.get(id);
	}

};
