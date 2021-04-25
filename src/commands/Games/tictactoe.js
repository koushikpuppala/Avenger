const { tictactoe: TicTacToe } = require('easy-games-js'),
	Command = require('../../structures/Command.js');

module.exports = class Tictactoe extends Command {
	constructor(bot) {
		super(bot, {
			name: 'tictactoe',
			dirname: __dirname,
			aliases: ['ttt', 'tttoe'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Play a game of tictactoe',
			usage: 'tictactoe',
			cooldown: 1000,
		});
	}

	async execute(bot, message, settings) {
		const member = this.getMemberFromMention(message, message.args);

		if(!member) return message.channel.error(settings.Language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

		const ticTacToe = new TicTacToe(member, message);

		ticTacToe.init({
			PROVIDE_MEMBER: 'Please provide a  member',
			ACCEPT_CHALLENGE: '{user} Do you accept this challange?',
			DOESNT_PLAY: 'looks like {user} doesnt wanna play',
			WICH_SIDE: '**{user}, Which Side Do You Pick? Type `End` To Forfeit!**',
			GAME_OVER: 'Times up!',
			END: 'end',
			INACTIVITY: 'game ended due to inactivity!',
			WINNER: 'Congrats u have won {winner}',
			DRAW: 'Its a draw',
		});
	}
};
