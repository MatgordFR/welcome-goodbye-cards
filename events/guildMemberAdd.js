const config = require('../config.json');
const client = require('../index');
const path = require('path');
const { createMemberCard } = require('../utils/canvas');

const IMAGE_PATH = path.join(__dirname, '../image/Bienvenue.png');

client.on('guildMemberAdd', async (member) => {
  if (member.partial) {
    try { await member.fetch(); } catch { return; }
  }

  const channel = client.channels.cache.get(config.Salon_Bienvenue);
  if (!channel) {
    console.warn('[AVERTISSEMENT] Canal de bienvenue non trouvé:', config.Salon_Bienvenue);
    return;
  }

  try {
    const attachment = await createMemberCard({
      imagePath: IMAGE_PATH,
      mainText: 'BIENVENUE',
      username: member.user.username,
      memberCountText: `NOUS SOMMES ${member.guild.memberCount}`,
      filename: 'bienvenue-image.png',
      avatarURL: member.user.displayAvatarURL({ extension: 'png', size: 1024 })
    });

    await channel.send({ files: [attachment] });
  } catch (error) {
    console.error('[ERREUR] Impossible de créer l\'image de bienvenue:', error.message);
  }
});
