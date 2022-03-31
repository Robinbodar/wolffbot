const discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {


    var theorie = args.join(" ");

    if(!theorie) return message.channel.send("Geen theorie meegegeven!")


    var theorieEmbed = new discord.MessageEmbed()
        .setTitle("Theorie")
        .setColor(config.color)
        .addField("**Ingezonden door:** ", message.author)
        .addField("**Context:**", theorie)
        .setFooter(config.footer)
        .setTimestamp()

    message.delete()
    
	var theorieacceptembed = new discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("Dankjewel voor deze inzending")
    message.reply(theorieacceptembed)
    .then(msg => {
        msg.delete({timeout: 10000})
    })

    let theorieChannel = message.guild.channels.cache.get(config.theoriechannel)
    if (!theorieChannel) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> Kan theorie kanaal niet vinden zorg dat je deze goed hebt ingevuld in config.json!`);


    theorieChannel.send(theorieEmbed).then(embedMessage => {
        embedMessage.react(config.theorieemoji1);
        embedMessage.react(config.theorieemoji2);
    });

};

module.exports.help = {
    name: `${config.botprefix}${config.theoriecmd}`
}
