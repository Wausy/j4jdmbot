const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`[PING] Açık tutuyorum...`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
const pingDiscord = require('discord.js');
const client = new pingDiscord.Client();
const chalk = require('chalk');
const fs = require('fs');
const db = require("quick.db")
const moment = require('moment');
require('./util/eventLoader')(client);

//////////////////////////////////////////////
client.ayarlar = {
"durum":"dnd",//online , idle , dnd 
"oynuyor":"J4J YAPILIR JOİN FOR JOİN DM",
"prefix":".",
"sahip":"662464079633580032",
"token":"TOKEN"
}
/////////////////////////////////////////////

const kurulum = message => {
  console.log(`Kurulum: ${message}`);
};

client.commands = new pingDiscord.Collection();
client.aliases = new pingDiscord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  kurulum(`${files.length} komut kurulacak.`);
   kurulum(`-------------------------`);
   files.forEach(f => {
    let pingKodları = require(`./komutlar/${f}`);
  
    kurulum(`Kurulan komut ~ ${pingKodları.help.name}.`);
    client.commands.set(pingKodları.help.name, pingKodları); 
    kurulum(`-------------------------`);
    client.commands.set(pingKodları.help.name, pingKodları);
    pingKodları.conf.aliases.forEach(alias => {
    client.aliases.set(alias, pingKodları.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let pingDosya = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, pingDosya);
      pingDosya.conf.aliases.forEach(alias => {
        client.aliases.set(alias, pingDosya.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === client.ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var hataKontrol = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


client.on("error", e => {
console.log("[PING] Hata oluştu!");
});

client.on("disconnect", e => {
  console.log("[PING] Botun bağlantısı kaybedildi!");
});

///////KURULUM KISMI SON//////////


////  zamanlı yazı BASLANGIC ////


setInterval(() => {
      client.channels.get("669830708600111104").send("> **:dizzy: JOİN FOR JOİN DM :dizzy: **");
}, 20000)

setInterval(() => {
      client.channels.get("653186220020465665").send("> **:dizzy: JOİN FOR JOİN DM :dizzy: **");
}, 30000)

setInterval(() => {
      client.channels.get("655781694976294942").send("> **:dizzy: JOİN FOR JOİN DM :dizzy: **");
}, 30000)


//client.login(client.ayarlar.token); 