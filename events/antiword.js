const ms = require('ms')
const { Client, Message, MessageEmbed } = require('discord.js');
const client = require('../index')
const antiwordsData = require('../utils/models/antiwords');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */


const badwords = [
    "fuck", "lund", "bc", "motherfucker", "chutiya", "porn", "sex"
]


client.on('message', (message) => {
    try {
        const messagedelete = () => {
            message.delete();
            message.reply(
                new MessageEmbed()
                    .setDescription(`\`\` I HAVE DETECTED BADWORDS \`\``)
            ).then((msg) => {
                msg.delete({ timeout: 5000 })
            })
        }
        antiwordsData.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (
                message.content.match(badwords)
            ) {
                messagedelete()
            }
        })
    } catch (e) {
        message.channel.send(e)
    }
})