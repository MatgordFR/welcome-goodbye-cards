const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

if (!config.token) {
  console.error('[ERREUR] Token Discord manquant dans config.json');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ],
  partials: [Partials.User, Partials.GuildMember]
});

module.exports = client;

const eventsPath = path.join(__dirname, 'events');
for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
  require(path.join(eventsPath, file));
}

process.on('unhandledRejection', (error) => {
  if (error.code === 10062) return;
  console.error('[ERREUR] Promise rejetée:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('[ERREUR] Exception non capturée:', error.message);
  process.exit(1);
});

client.login(config.token);
