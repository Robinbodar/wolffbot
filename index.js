const discord = require('discord.js');
const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'MEMBER'] }); const client = new discord.Client();
const config = require("./config.json");
const fs = require("fs");
require("./handlers")(bot);
bot.commands = new discord.Collection();



bot.on("ready", async member => {
    console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[32m`, `> De bot is ingeladen!`);


    setInterval(function () {

        let statut = ["WATCHING"];
        let rndmStatut = statut[Math.floor(Math.random() * statut.length)];

        let statuttext = ['Wie de wolff is!'];
        const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
        bot.user.setActivity(randomText, { type: rndmStatut });
    }, 30000)
});

bot.on('raw', packet => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = bot.channels.cache.get(packet.d.channel_id);
    if (channel.messages.cache.has(packet.d.message_id)) return;
    channel.messages.fetch(packet.d.message_id).then(async message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = await message.reactions.cache.get(emoji);
        if (reaction) reaction.users.cache.set(packet.d.user_id, bot.users.cache.get(packet.d.user_id));
        const user = await bot.users.fetch(packet.d.user_id);
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, user);
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, user);
        }
    });
});

bot.on('message', async message => {
    if (message.author.bot) return
    if (message.channel.type === "dm") return;
    var messageArray = message.content.split(/ +/);
    var command = messageArray[0];
    var arguments = messageArray.slice(1);
    var commands = bot.commands.get(command.slice(/ +/));
    if (commands) commands.run(bot, message, arguments);
});

module.exports = {
    bot: bot
}

bot.login(config.token)