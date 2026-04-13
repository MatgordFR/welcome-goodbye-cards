const config = require('../config.json');
const client = require('../index');
const path = require('path');
const { createMemberCard } = require('../utils/canvas');

const IMAGE_PATH = path.join(__dirname, '../image/Depart.png');

client.on('guildMemberRemove', async (member) => {
  if (member.partial) {
    try { await member.fetch(); } catch { return; }
  }

  const channel = client.channels.cache.get(config.Salon_Depart);
  if (!channel) {
    console.warn('[AVERTISSEMENT] Canal de départ non trouvé:', config.Salon_Depart);
    return;
  }

  try {
    const attachment = await createMemberCard({
      imagePath: IMAGE_PATH,
      mainText: 'AU REVOIR',
      username: member.user.username,
      memberCountText: `NOUS SOMMES DÉSORMAIS ${member.guild.memberCount}`,
      filename: 'depart-image.png',
      avatarURL: member.user.displayAvatarURL({ extension: 'png', size: 1024 })
    });

    await channel.send({ files: [attachment] });
  } catch (error) {
    console.error('[ERREUR] Impossible de créer l\'image de départ:', error.message);
  }
});
