const Discord = require("discord.js")
const bot = new Discord.Client();
const envvar = require('envvar')

const token = envvar.string('DISCORD_API_SECRET_TOKEN')

bot.on('ready', () => {
    console.log('Bot ONLINE')
})

prev_channel = [];
const canal_AFK_id = '785554617080873000'

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    // When somebody selfdeafs
	if (!oldMember.selfDeaf && newMember.selfDeaf) {
	    prev_channel[newMember.member.id] = newMember.channelID
        newMember.setChannel(canal_AFK_id)
	}

	// When somebody selfundeafs
	if (oldMember.selfDeaf && !newMember.selfDeaf) {
        if(newMember.channelID === canal_AFK_id){
            newMember.setChannel(prev_channel[newMember.member.id])
        }
	}
});

bot.login(token)
