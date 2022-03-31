const {bot} = require("../index");
const discord = require("discord.js");
const config = require("../config.json");


bot.on('message', async message => {
    if (message.content.toLowerCase().startsWith(`${config.botprefix}${config.rolecmd}`)) {
        if (message.member.roles.cache.find(r => r.name == config.bestuurname)) {
            message.delete()
            const roleEmbed = new discord.MessageEmbed()
                .setTitle('Ontvang je role')
                .setDescription("Voeg hier je rang toe doormiddel van een emoij aan te klikken!\n~ Klik op deze:🧩 om een melding te krijgen als er een nieuwe puzzel is! \n~ Klik op deze:🐺 om een melding te krijgen als er wat veranderd in de discord! \n\n Wie is de Wolff Team!")
                .setColor(config.color)
                .setFooter(config.footer)
                .setTimestamp()
                let roleReact = await message.channel.send(roleEmbed)
                roleReact.react(config.roleemoji);
            	roleReact.react(config.role2emoji)
        }   
        console.log(`\x1b[34m`, `[${message.author.username}]`, `\x1b[37m`, `> ${config.botprefix}${config.rolecmd}`);
    }
    
});




bot.on("messageReactionAdd", async (reaction, user, err) => {
    if (!reaction.message.embeds[0]) return
    
    if (reaction.message.embeds[0].title == 'Ontvang je role')  {
        if (reaction.emoji.name == config.roleemoji) {
            if (user.bot) return;
            var member = reaction.message.guild.members.cache.get(user.id);
            var spelerRole = member.guild.roles.cache.find(r => r.name == config.puzzelname)
            if (!spelerRole) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> Kan puzzel role niet vinden zorg dat je deze goed hebt ingevuld in config.json!`)
            member.roles.add(spelerRole)
        } 
    }
});

bot.on("messageReactionAdd", async (reaction, user, err) => {
    if (!reaction.message.embeds[0]) return
    
    if (reaction.message.embeds[0].title == 'Ontvang je role')  {
        if (reaction.emoji.name == config.role2emoji) {
            if (user.bot) return;
            var member = reaction.message.guild.members.cache.get(user.id);
            var spelerRole = member.guild.roles.cache.find(r => r.name == config.wolfjename)
            if (!spelerRole) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `> Kan wolfje role niet vinden zorg dat je deze goed hebt ingevuld in config.json!`)
            member.roles.add(spelerRole)
        } 
    }
});
