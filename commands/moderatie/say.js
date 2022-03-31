const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: **U mag dit command niet uitvoeren!**")
    if (!message.member.roles.cache.find(r => r.name.includes(config.managementname)))
    


    message.delete()
    const embed = new MessageEmbed()
        .setColor(config.color)
        .setThumbnail(config.welkompicture)
        .setDescription(args.join(" "))
        .setFooter(config.footer)
        .setTimestamp()
    message.channel.send({ embed })
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.saycmd} ${args}`,);
}



module.exports.help = {
    name: `${config.botprefix}${config.saycmd}`
}
