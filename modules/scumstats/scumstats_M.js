const { SlashCommandBuilder } = require('@discordjs/builders');
const got = require('got');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scumserver')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		(async () => {
			try {
				const response = await got('https://api.scumserver.net/servers/23.227.197.98:7022');
				console.log(response.body);
				var data = JSON.parse(response.body);
				console.log(data);
				console.log(data.server.server_name);
		
				await interaction.reply(data.server.server_name + "\nIP: " + data.server.server_ip + ":"+data.server.server_port +
					'\nPlayers: ' + data.server.current_players + '/' + data.server.max_players +
					"\nGame Time: "+ data.server.game_time+
					"\nLast Update: "+data.server.last_update.substring(0,19));
		
				//=> '<!doctype html> ...'
			} catch (error) {
				console.log(error.response.body);
				//=> 'Internal server error ...'
			}
		})();
		
	},
};

