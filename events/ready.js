const { EmbedBuilder, ActivityType, PresenceUpdateStatus } = require('discord.js');
const client = require('../index');
const config = require('../config.json');

const STATUSES = [
  { name: 'By: MatgordFR ©', type: ActivityType.Watching },
  { name: 'By: MatgordFR ©', type: ActivityType.Listening },
  { name: 'By: MatgordFR ©', type: ActivityType.Competing },
  { name: 'By: MatgordFR ©', type: ActivityType.Playing }
];

client.on('clientReady', async () => {
  console.log('');
  console.log('                               #     #                                          ####### ###### ');
  console.log('                               ##   ##   ##   #####  ####   ####  #####  #####  #       #     #');
  console.log('                               # # # #  #  #    #   #    # #    # #    # #    # #       #     #');
  console.log('                               #  #  # #    #   #   #      #    # #    # #    # #####   ###### ');
  console.log('                               #     # ######   #   #  ### #    # #####  #    # #       #   #  ');
  console.log('                               #     # #    #   #   #    # #    # #   #  #    # #       #    # ');
  console.log('                               #     # #    #   #    ####   ####  #    # #####  #       #     #');
  console.log('');
  console.log('                                                   Crée par MatgordFR!');
  console.log('                                                     © 2026 Matgord, Inc.');
  console.log('');
  console.log('                                             Github: https://github.com/MatgordFR');
  console.log('                                               X : https://x.com/matgordfr');
  console.log('');
  console.log(`Connecté: ${client.user.username} (${client.user.id})`);

  const avatarURL = client.user.displayAvatarURL({ forceStatic: false });
  const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

  const restartEmbed = new EmbedBuilder()
    .setColor(config.color_principal)
    .setThumbnail(avatarURL)
    .setAuthor({ name: `${client.user.username} vient de redémarrer`, iconURL: avatarURL })
    .addFields(
      { name: '👥 Utilisateurs', value: `${memberCount}`, inline: true }
    )
    .setFooter({ text: 'By: MatgordFR ©', iconURL: avatarURL })
    .setTimestamp();

  try {
    const channel = client.channels.cache.get(config.Salon_Logs_Demarrage);
    if (channel) {
      await channel.send({ embeds: [restartEmbed] });
    } else {
      console.warn('[AVERTISSEMENT] Canal de logs de redémarrage non trouvé');
    }
  } catch (error) {
    console.error('[ERREUR] Impossible d\'envoyer l\'embed de redémarrage:', error.message);
  }

  client.user.setStatus(PresenceUpdateStatus.Idle);
  client.user.setActivity(STATUSES[Math.floor(Math.random() * STATUSES.length)]);

  if (client._activityInterval) clearInterval(client._activityInterval);
  client._activityInterval = setInterval(() => {
    client.user.setActivity(STATUSES[Math.floor(Math.random() * STATUSES.length)]);
  }, 20000);
});
