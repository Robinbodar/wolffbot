const {bot} = require("../index");
const discord = require("discord.js");
const config = require("../config.json");

bot.on("message", async message => {

if (message.author.bot) return
if (message.channel.type === "dm") return;


if (message.content.toLowerCase().startsWith(`${config.botprefix}${config.ticketaanmakencmd}`)) {
    if (message.member.roles.cache.find(r => r.name == config.bestuurname)) {
        message.delete()
        var ticketEmbed = new discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(":tickets: Ticket openen")
            .setThumbnail(config.welkompicture)
            .setDescription(`Reageer om een ticket te openen!\n\n${config.ticketemojihulp} | Hulp`)
            .setFooter(config.footer + " • Ticket openen")
        message.channel.send(ticketEmbed).then(message => {
            message.react(config.ticketemojihulp);
        })
    }
    console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.ticketaanmakencmd}`)
}})



bot.on("messageReactionAdd", async (reaction, member) => {
    if (member.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.message.channel.partial) await reaction.message.fetch()
    if (!reaction.message.embeds[0]) return


    if (reaction.message.embeds[0].title == ":tickets: Ticket openen") {

        if (reaction.emoji.name == config.ticketemojihulp) {
            openTicketHulp(member, config.ticketcategory, reaction)
        }; 
    }


    
    function openTicketHulp(member, topic, reaction) {
        var Ticket = reaction.message.guild.channels.cache.find(c => c.name == config.ticketcategory)
        if (!Ticket) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> > Kan ticket category niet vinden zorg dat je deze goed hebt ingevuld in config.json!`)
        reaction.users.remove(member.id)
        reaction.message.guild.channels.create("Hulp" + "-" + member.username, {
            type: 'text',
            parent: reaction.message.guild.channels.cache.find(c => c.name == config.ticketcategory).id,
            permissionOverwrites: [{
                id: member.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: reaction.message.member.guild.roles.cache.find(r => r.name == config.managementname).id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: reaction.message.member.guild.id,
                deny: ['VIEW_CHANNEL'],
            }
        ]
    }).catch().then(ticket_channel => {
        var ticketEmbed = new discord.MessageEmbed()
            .setColor(config.color)
            .setDescription("Je ticket is aangemaakt! <#" + ticket_channel.id + ">")
        reaction.message.channel.send(ticketEmbed).then(message => {
            setTimeout(function () {
                message.delete()
            }, 5000)
        })
    var botAvatar = bot.user.displayAvatarURL()
    var avatar = member.displayAvatarURL()
    var ticketEmbed = new discord.MessageEmbed()
        .setColor(config.color)
        .setTitle("Ticket")
        .setDescription("Je hebt een ticket aangemaakt!\n U word z.s.m geholpen door het support team!")
        .setFooter("Ticket van " + member.tag + ". • " + config.footer, avatar)
        ticket_channel.send(`<@${member.id}>, <@&${reaction.message.guild.roles.cache.find(r => r.name == config.managementname).id}>.`)
        ticket_channel.send(ticketEmbed)
    }).catch()
};
});

