const Canvas = require('canvas');
const { AttachmentBuilder } = require('discord.js');

const CANVAS_CONFIG = {
  width: 1024,
  height: 500,
  avatarSize: 238,
  avatarX: 393,
  avatarY: 46,
  circleCenterX: 512,
  circleCenterY: 166,
  circleRadius: 119
};

const imageCache = new Map();

async function getBackground(imagePath) {
  if (!imageCache.has(imagePath)) {
    imageCache.set(imagePath, await Canvas.loadImage(imagePath));
  }
  return imageCache.get(imagePath);
}

function truncateText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  while (ctx.measureText(text + '…').width > maxWidth) {
    text = text.slice(0, -1);
  }
  return text + '…';
}

async function createMemberCard({ imagePath, mainText, username, memberCountText, filename, avatarURL }) {
  const canvas = Canvas.createCanvas(CANVAS_CONFIG.width, CANVAS_CONFIG.height);
  const ctx = canvas.getContext('2d');
  const { circleCenterX, circleCenterY, circleRadius, avatarX, avatarY, avatarSize } = CANVAS_CONFIG;

  ctx.drawImage(await getBackground(imagePath), 0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height);

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';

  ctx.font = 'oblique small-caps bold 75px sans-serif';
  ctx.fillText(mainText, circleCenterX, 360);

  ctx.font = 'oblique small-caps bold 53px sans-serif';
  ctx.fillText(truncateText(ctx, username, 900), circleCenterX, 420);

  ctx.font = 'oblique small-caps bold 35px sans-serif';
  ctx.fillText(memberCountText, circleCenterX, 470);

  ctx.font = 'bold 18px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('By: MatgordFR ©', 10, CANVAS_CONFIG.height - 10);

  ctx.save();
  ctx.beginPath();
  ctx.arc(circleCenterX, circleCenterY, circleRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.clip();

  const avatarBuffer = await fetch(avatarURL).then(res => res.arrayBuffer()).then(buf => Buffer.from(buf));
  ctx.drawImage(await Canvas.loadImage(avatarBuffer), avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  return new AttachmentBuilder(canvas.toBuffer(), { name: filename });
}

module.exports = { createMemberCard };
