const config = require("./config.json");
const fs = require("fs");

module.exports = (bot) => {

  const { promisify } = require("util");
  const { REPL_MODE_SLOPPY } = require("repl");
  const readdir = promisify(require("fs").readdir);

     fs.readdir("./events/", (err, files) => {
        if (err) console.log(err);
         
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) return console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[31m`, `Geen events gevonden!`);

        jsfile.forEach((f, i) => {
            require(`./events/${f}`);
          console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[33m`, `> Event geladen > ${f}`);  
        });      
        
    });
    
    fs.readdir("./commands/", (err, files) => {
      if (err) console.log(err);
    
      let jsfile = files.filter(f => f.split(".").pop() === "js");
      if (jsfile.length <= 0) return; 
    
      jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[33m`, `> Command geladen > ${f}`);
        bot.commands.set(props.help.name, props);
      });

    });

    const stuff = ['moderatie', 'overige', 'ticket'];
    stuff.forEach(c => {
    readdir(`./commands/${c}/`, (err, files) => {
        if (err) throw err;
        console.log(`\x1b[36m`, `[${config.botname}]`, `\x1b[33m`, `> Command's geladen > ${c}`);
        files.forEach(f => {
            if (!f.endsWith(".js")) return;
            let props = require(`./commands/${c}/${f}`);
            bot.commands.set(props.help.name, props);
        });
    });
});
};