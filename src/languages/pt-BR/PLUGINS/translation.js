const languageData = {
	// SUCCESS
	LANGUAGE_SET: (language) => `O idioma foi definido para \`${language}\`.`,
	LEVEL_SET: (option) => `O plugin de nível foi definido para \`${option}\`.`,
	MODERATION_SET: (option) => `O plugin de moderação foi definido para \`${option}\`.`,
	MUSIC_SET: (option) => `O plugin de música foi definido para \`${option}\`.`,
	NSFW_SET: (option) => `NSFW plugin has been set to \`${option}\`.`,
	SEARCH_SET: (option) => `O plugin de pesquisa foi definido para \`${option}\`.`,
	LOGS_SET: (option) => `O plugin de registro foi definido como \`${option}\`.`,
	PREFIX_SET: (newprefix) => `Prefix has been set to \`${newprefix}\`.`,
	// error message
	MISSING_LANGUAGE: 'Nenhum idioma selecionado.',
	NO_LANGUAGE: 'Essa não é uma linguagem que eu suporte, ainda. Por que não me ajuda a aprender esse idioma inscrevendo-se aqui: https://discord.gg/MsJ99j5Bcv',
	// other success messages
	LOG_CHANNEL: (channelID) => `Canal de registro atualizado para: <#${channelID}>`,
	PREFIX_LENGTH: 'Please ensure the prefix is no larger than 3 characters',
};

const translate = (key, args) => {
	const translation = languageData[key];
	if (typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;
