const discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

    let cata = message.guild.channels.cache.find(c => c.name == config.ticketcategory && c.type == "category")
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: U mag deze command niet uitvoeren!")
    if (!message.member.roles.cache.find(r => r.name.includes(config.bestuurname) || message.member.roles.cache.find(r => r.name.includes(config.managementname)))) return message.channel.send(":x: U bent geen support member!");

    message.delete()

    if (message.channel.parentID == cata.id) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Kon de gebruiker niet vinden!")

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true});
        
        message.channel.send(`${user} Is succesvol toegevoegd aan de ticket!`)

    } else return message.channel.send("Dit is geen ticket kanaal!")
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.ticketaddcmd} ${args}`)
}

module.exports.help = {
    name: `${config.botprefix}${config.ticketaddcmd}`
}
