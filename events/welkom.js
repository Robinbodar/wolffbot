const {bot} = require("../index");
const discord = require("discord.js");
const config = require("../config.json");


bot.on("guildMemberAdd", async member => {

    const welkomEmbed = new discord.MessageEmbed()
        .setTitle(`Welkom ${member.user.username}!`)
        .setDescription(`Welkom bij de zoektocht naar de betekenis achter het mysterieuze pakket, we hebben op dit moment **${member.guild.memberCount}** members, veel puzzel plezier!`)
        .setColor(config.color)
        .setThumbnail(config.welkompicture)
        .setFooter(config.footer)
    let welkomChannel = member.guild.channels.cache.get(config.welkomchannel)
    if (!welkomChannel) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> Kan welkom kanaal niet vinden zorg dat je deze goed hebt ingevuld in config.json!`);
    welkomChannel.send(welkomEmbed)
});
