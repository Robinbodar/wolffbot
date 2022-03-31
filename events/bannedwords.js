const {bot} = require("../index");
const discord = require("discord.js");
const config = require("../config.json");
bot.on("message", async message => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return;

if (message.content.toLowerCase().startsWith('ltwolf514')) {
    message.delete();
    message.author.send('Dat woord is verboden gebruik dit niet meer. Denk je dat dit een fout is maak een ticket aan')
}
});