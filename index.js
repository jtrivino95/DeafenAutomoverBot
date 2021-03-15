const Discord = require("discord.js")
const bot = new Discord.Client();
const envvar = require('envvar')

const token = envvar.string('DISCORD_API_SECRET_TOKEN')

bot.on('ready', () => {
    console.log('Bot ONLINE')
})

prev_channel = [];
const channel_AFK_id = '785554617080873000'
const channel_ACTUAL_id = '411660383577702402'

bot.on('voiceStateUpdate', (oldMember, newMember) => {
	// When somebody selfdeafs
	if (!oldMember.selfDeaf && newMember.selfDeaf) {
		prev_channel[newMember.member.id] = newMember.channelID
		newMember.setChannel(channel_AFK_id)
	}

	// When somebody selfundeafs
	if (oldMember.selfDeaf && !newMember.selfDeaf) {
		if(newMember.channelID === channel_AFK_id){
			if (prev_channel[newMember.member.id]) {
				newMember.setChannel(prev_channel[newMember.member.id])
			} else {
				newMember.setChannel(channel_ACTUAL_id)
			}
		}
	}
});

bot.login(token)
