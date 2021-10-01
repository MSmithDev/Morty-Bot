const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quack')
		.setDescription('A Swift Verbal Quack!'),
	async execute(interaction) {
                //console.log(interaction);
                const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        //player
        const player = createAudioPlayer();
        //Sound to play
        const resource = createAudioResource('./modules/quack/audio/duck.mp3');
        console.log(resource);
        //play sound
        connection.subscribe(player);
        player.play(resource);
        function killVoice() {
                connection.disconnect();
                }
        player.on(AudioPlayerStatus.Idle, () => killVoice());
		await interaction.reply('Quack!');
	},
};



//const player = createAudioPlayer();

        // //console.log(interaction)
        // const guild = client.guilds.cache.get(interaction.guildId);
        // // console.log("Guild ID" + client.guilds.cache.get(interaction.guildId));
        //  const member = guild.members.cache.get(interaction.user.id);
        // // console.log(member);
        //  voiceChannel = member.voice.channel;
    
        // userChannel = interaction.member.voice.channel;
        // userGuildId = interaction.guild.id;
        
        // //console.log("VC ID: " + voiceChannel);
        // const connection = joinVoiceChannel({
        //     channelId: userChannel.id,
        //     guildId: userGuildId,
        //     adapterCreator: userChannel.guild.voiceAdapterCreator,
        // });
        // const resource = createAudioResource('./duck.mp3');
        // player.play(resource);
        // console.log(connection);
        // connection.subscribe(player);
        // player.play(resource);
        // function killVoice() {
        //     connection.disconnect();
        // }
        // //interaction.reply("quack");
        // player.on(AudioPlayerStatus.Idle, () => killVoice());
        // await interaction.reply('Quack!');