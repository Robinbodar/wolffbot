const {bot} = require("../index");
const discord = require("discord.js");
const config = require("../config.json");

bot.on("message", async message => {

    if (message.author.bot) return
    if (message.channel.type === "dm") return;
    
if (message.content.toLowerCase().startsWith("!help")) {
    message.delete()
    var avatar = message.author.displayAvatarURL()
    var embedMessage = new discord.MessageEmbed()
        .setColor(config.color)
        .setTitle(":information_source: | Command Help")
        .setDescription("Wij hebben de commands opgedeeld in categorieën:\n\n:paperclip: | Basic Commands\n:tickets: | Tickets\n:mag_right: | Moderatie\n:bulb: | Info commands")
        .setFooter("Voor " + message.author.tag + ". • Command Help", avatar)
    sentMessage = await message.channel.send(embedMessage)
    sentMessage.react("📎")
    sentMessage.react("🎟️")
    sentMessage.react("🔎")
    sentMessage.react("💡")
}}); 



bot.on("messageReactionAdd", async (reaction, member) => {
    if (member.bot) return
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.message.channel.partial) await reaction.message.channel.fetch()
    if (!reaction.message.embeds[0]) return

    if (reaction.message.embeds[0].title == ":information_source: | Command Help") {
        if (reaction.emoji.name == "📎") {
            var embedMessage = new discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(":information_source: Command Help - Basic Commands")
                .setDescription("Dit zijn basic commands.\n\n`!help`\nHet help command.\n`!theorie`\nLaat een theorie achter.\n\n'!zend'\n Om iets in te zenden naar staff")
                .setFooter("Voor " + member.tag + ". • Command Help - Basic Commands")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "🎟️") {
            var embedMessage = new discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(":information_source: Command Help - Tickets")
                .setDescription("Dit zijn ticket commands.\n\n`!close`\nSluit een ticket.\n`!rename`\nHernoem een ticket.\n`!ticketadd`\nVoeg iemand toe aan de ticket.\n`!remove`\nVerwijder iemand uit de ticket.")
                .setFooter("Voor " + member.tag + ". • Command Help - Tickets")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "🔎") {
            var embedMessage = new discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(":information_source: Command Help - Moderatie")
                .setDescription("Dit zijn moderatie commands.\n\n`!say`\nZeg iets met de bot. (Embed)(Logo)\n\n''!purge (hoeveelheid)'\nVerwijder een aantal berichten.\n\n'!roleselect'\nOm de roleselect menu te plaatsen!")
                .setFooter("Voor " + member.tag + ". • Command Help - Moderatie")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
        if (reaction.emoji.name == "💡") {
            var embedMessage = new discord.MessageEmbed()
                .setColor(config.color)
                .setTitle(":information_source: Command Help - Info Commands")
                .setDescription("Dit zijn info commands.\n\n")
                .setFooter("Voor " + member.tag + ". • Command Help - Info Commands")
            reaction.message.edit(embedMessage)
            reaction.message.reactions.removeAll()
        }
    }
    
})
