const config = require("../../config.json");

module.exports.help = {
    name: `${config.botprefix}${config.ticketclosecmd}`
}

let time = 10e3;
module.exports.run = async (bot, message, args) => {

    if (!message.channel.parent) return message.channel.send("Dit is geen ticket!")
    if(message.channel.parent.name != config.ticketcategory) return message.channel.send("Dit is geen ticket!")

    message.delete()
    
    if(!message.member.roles.cache.find(r => r.name.includes(config.bestuurname) || message.member.roles.cache.find(r => r.name.includes(config.managementname)))) 
        return message.channel.send(":x: U bent geen support member!");


    let msg = await message.channel.send(`Ik sluit de ticket over **${time / 1e3}** seconden! Type **annuleer** om dit te verkomen!`);
    let collector = msg.channel.createMessageCollector(m => m.content.toLowerCase().includes("annuleer"), { time: time, max: 1 })
    collector.on("end", collected => {
        if (collected.size <1) return msg.channel.delete();
        msg.channel.send("Ik ben gestopt!")
    })
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.ticketclosecmd}`)
}