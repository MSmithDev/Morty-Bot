const { SlashCommandBuilder } = require('@discordjs/builders');
const discordTTS = require('discord-tts');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus, AudioResource } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('echotts')
		.setDescription('Say what you type')
        .addStringOption(option =>
            option.setName('input')
            .setDescription('Text to speak')
            .setRequired(true)),
        
	async execute(interaction) {
                //console.log(interaction);
                const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        
        const input = await interaction.options.getString('input');
        
        console.log(input);
        //player
        const player = createAudioPlayer();
        //Sound to play
        
        const resource = createAudioResource(discordTTS.getVoiceStream(input+','));
        //console.log(resource);
        //play sound
        connection.subscribe(player);
        //res = AudioResource.getVoiceStream()
        //player.play(discordTTS.getVoiceStream('test 123'));
        setTimeout(function() {
            player.play(resource);
        }, 1000);
        
        function killVoice() {
            setTimeout(function() {
                //connection.disconnect();
            }, 1000);
                
                }
        player.on(AudioPlayerStatus.Idle, () => killVoice());
		await interaction.reply('Quack!');
	},
};