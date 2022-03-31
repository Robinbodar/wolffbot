const discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {


    var code = args.join(" ");

    if(!code) return message.channel.send("Niks meegegeven!")


    var codeEmbed = new discord.MessageEmbed()
        .setTitle("Inzending")
        .setColor(config.color)
        .addField("**Ingezonden door:** ", message.author)
        .addField("**Context:**", code)
        .setFooter(config.footer)
        .setTimestamp() 

        message.delete()

    var codeacceptembed = new discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("Dankjewel voor deze inzending")
    message.reply(codeacceptembed)
    .then(msg => {
        msg.delete({timeout: 10000})
    })
    let codeChannel = message.guild.channels.cache.get(config.codechannel)
    if (!codeChannel) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> Kan code kanaal niet vinden zorg dat je deze goed hebt ingevuld in config.json!`);


    codeChannel.send(codeEmbed).then(embedMessage => {
        embedMessage.react(config.codeemoji1);
        embedMessage.react(config.codeemoji2);
    });

};

module.exports.help = {
    name: `${config.botprefix}${config.codecmd}`
}
