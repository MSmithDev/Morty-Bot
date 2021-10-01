// Require the necessary discord.js classes
const { Client, Collection, Intents, MessageSelectMenu } = require('discord.js');
//Grab token from config
const { token } = require('./config.json');
//
const fs = require('fs');
//
const read = require("fs-readdir-recursive");
const { Console } = require('console');
//

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();

//list of loaded commands
const commands = [];
//Read files from module dir, fliter for files ending in "_M.js"
const commandFiles = read("modules").filter(item => item.endsWith("_M.js"));

console.log('\x1b[36m',"Found "+ commandFiles.length + " Modules");

//Load modules
for (const file of commandFiles) {
    console.log('\x1b[33m',"Loading Module: " + file.split('\\')[0]);
	const command = require(`./modules/${file}`);
	client.commands.set(command.data.name, command);
    //commands.push(command.data.toJSON());
}
console.log('\x1b[32m',"Loaded modules succesfully");


// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('\x1b[0m','Running!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(token);












// import got from 'got';

// import { joinVoiceChannel, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
// import { createAudioPlayer } from '@discordjs/voice';









