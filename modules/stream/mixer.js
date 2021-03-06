const request = require('request')
const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = (bot) => {

	bot.addCommand('mixer', (payload) => {
			var message = payload.message
			var suffix = message.content.split(" ").slice(1).join(" ");
			if(suffix == "" || suffix == null) return message.channel.send("Do "+config.prefix+"mixer username for Status for Mixer!");
			request("https://mixer.com/api/v1/channels/" +suffix, function(error, response, body) { //set info for the streamer in JSON
			if (!error && response.statusCode == 200) { 
				var mixerInfo = JSON.parse(body);
				if (mixerInfo.online) {
					let embed = new Discord.RichEmbed();
					embed.setColor(0x9900FF)
					embed.setThumbnail(mixerInfo.user.avatarUrl)
					embed.setTitle( suffix + " mixer Channel!")
            		embed.setURL("http://mixer.com/" + suffix)
            		embed.addField("Online", mixerInfo.online, true)
		    		embed.addField("Title", mixerInfo.name, true)
            		embed.addField("Followers", mixerInfo.numFollowers, true)
            		embed.addField("Beam Level", mixerInfo.user.level, true)
		    		embed.addField("Watching", mixerInfo.viewersCurrent, true)
            		embed.addField("Total Views", mixerInfo.viewersTotal, true)
            		embed.addField("Joined Beam", mixerInfo.createdAt, true)
            		embed.addField("Audience", mixerInfo.audience, true)
            		embed.addField("Partnered", mixerInfo.partnered, true)
		    		embed.addField("Player.me", mixerInfo.user.social.player, true)
		    		embed.addField("Youtube", mixerInfo.user.social.youtube, true)
		    		embed.addField("Twitter", mixerInfo.user.social.twitter, true)
		    		embed.addField("Facebook", mixerInfo.user.social.facebook, true)
		    		embed.addField("Instagram", mixerInfo.user.social.instagram, true)
		    		embed.addField("Steam", mixerInfo.user.social.steam, true)
					embed.addField("Discord", mixerInfo.user.social.discord, true)

					message.channel.send({embed})
					
				} else {

					message.reply(suffix+" is offline")
				}
			}
		})
	});
}
