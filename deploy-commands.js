const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, devGuildId } = require('./config.json');
const read = require("fs-readdir-recursive");
//list of loaded commands
const commands = [];
//Read files from module dir, fliter for files ending in "_M.js"
const commandFiles = read("modules").filter(item => item.endsWith("_M.js"));
console.log('\x1b[36m',"Found "+ commandFiles.length + " Modules");
//load module info and push to commands
for (const file of commandFiles) {
	console.log('\x1b[33m',"Grabbing commands from: " + file.split('\\')[0]);
	const command = require(`./modules/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);
//Deploy to AVJ
console.log('\x1b[34m', "Pushing to AvJ");
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands to Avj'))
	.catch(console.error);

//Deploy to Dev
console.log('\x1b[34m', "Pushing to Dev");
rest.put(Routes.applicationGuildCommands(clientId, devGuildId), { body: commands })
	.then(() => console.log('Successfully registered application commands to Dev'))
	.catch(console.error);

	console.log('\x1b[0m','Finished pushing commands');