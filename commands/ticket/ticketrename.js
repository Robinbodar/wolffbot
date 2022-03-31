const discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

    let supportid = config.supportid;
    let cate = message.guild.channels.cache.find(c => c.name == config.ticketcategory && c.type == "category")

    if (!message.member.roles.cache.find(r => r.name.includes(config.bestuurname) || message.member.roles.cache.find(r => r.name.includes(config.managementname)))) return message.channel.send(":x: U bent geen support member!");

    message.delete()

    if(!message.member.roles.cache.has(supportid)) return message.channel.send(":x: U mag deze command niet uitvoeren!")
    if (message.channel.parentID == cate.id) {
        if (!args[0]) return message.channel.send("u heeft geen nieuwe ticket naam meegegeven!")
        message.channel.setName(args.join(' ')).then(ch => {
            message.channel.send(`Ticket naam is veranderd naar: ${ch.name}`)
        
        })
    } else return message.channel.send("Dit is geen ticket!")
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.ticketrenamecmd} ${args}`)
}

module.exports.help = {
    name: `${config.botprefix}${config.ticketrenamecmd}`
}