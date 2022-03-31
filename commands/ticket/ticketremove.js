const discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

    let cata = message.guild.channels.cache.find(c => c.name == config.ticketcategory && c.type == "category")

    if (!message.member.roles.cache.find(r => r.name.includes(config.bestuurname) || message.member.roles.cache.find(r => r.name.includes(config.managementname)))) return message.channel.send(":x: U bent geen support member!");

    message.delete()

    if (message.channel.parentID == cata.id) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`:x: U mag deze command niet uitvoeren!`).then(msg => msg.delete({ timeout: 1000 }));
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Kon de gebruiker niet vinden!")
    

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });

        message.channel.send(`${user} was succesvol verwijderd uit de ticket!`)
    
    } else return message.channel.send("Dit is geen ticket!").then(msg => msg.delete({ timeout: 10000 }));
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.ticketremovecmd} ${args}`)
}

module.exports.help = {
    name: `${config.botprefix}${config.ticketremovecmd}`
}