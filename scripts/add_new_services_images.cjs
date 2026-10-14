const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const IMAGES_DIR = path.resolve(__dirname, '../public/images');

const SERVICES_IMAGES = {
  'violin-program': 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=1000&auto=format&fit=crop&q=85',
  'melam-nadhasvaram': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=85',
  'aiyar': 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&auto=format&fit=crop&q=85',
  'manamakal-malai': 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1000&auto=format&fit=crop&q=85',
  'arkestra-music': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=85',
  'food-stall': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=85',
  'horse-chariot': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=85',
  'mack-up': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000&auto=format&fit=crop&q=85',
  'bridal-groom': 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=85'
};

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadBuffer(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function processAll() {
  console.log('Processing 9 new services images...');

  for (const [key, url] of Object.entries(SERVICES_IMAGES)) {
    try {
      console.log(`Downloading ${key}...`);
      const rawBuf = await downloadBuffer(url);

      const webpPath = path.join(IMAGES_DIR, `${key}.webp`);
      const pngPath = path.join(IMAGES_DIR, `${key}.png`);

      // 1. Generate WebP
      const webpBuf = await sharp(rawBuf)
        .resize(900, 675, { fit: 'cover', position: 'center' })
        .webp({ quality: 86, effort: 5 })
        .toBuffer();
      fs.writeFileSync(webpPath, webpBuf);

      // 2. Generate PNG fallback
      const pngBuf = await sharp(rawBuf)
        .resize(900, 675, { fit: 'cover', position: 'center' })
        .png({ compressionLevel: 9, effort: 7, palette: true })
        .toBuffer();
      fs.writeFileSync(pngPath, pngBuf);

      console.log(`✓ ${key}: WebP ${(webpBuf.length / 1024).toFixed(0)} KB | PNG ${(pngBuf.length / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.error(`Error processing ${key}:`, err);
    }
  }

  console.log('Finished generating images for all new services!');
}

processAll();
