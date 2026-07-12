const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const path = require("path");

// Validation de la config au démarrage : un message clair vaut mieux qu'un crash obscur plus loin.
const requis = ['token', 'Salon_Bienvenue', 'Salon_Depart'];
const manquants = requis.filter(k => !config[k] || String(config[k]).trim() === '');
if (config.token === 'TON_TOKEN_DISCORD') manquants.push("token (c'est encore la valeur d'exemple)");
if (manquants.length) {
  console.error(`[CONFIG] config.json invalide — clés manquantes ou vides : ${manquants.join(', ')}.`);
  console.error('[CONFIG] Copie config.example.json vers config.json et remplis-le.');
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
