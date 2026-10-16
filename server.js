import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// API: Save section image permanently
app.post('/api/save-section-image', (req, res) => {
  const rawId = req.query.id || req.headers['x-section-id'] || 'section';
  const cleanId = String(rawId).replace(/[^a-zA-Z0-9_-]/g, '');
  const publicDir = path.resolve(__dirname, 'public');
  const imagesDir = path.join(publicDir, 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let destDir = imagesDir;
  if (cleanId.startsWith('work-')) {
    destDir = path.join(imagesDir, 'works');
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
  }

  const targetFile = path.join(destDir, `${cleanId}.png`);
  const writeStream = fs.createWriteStream(targetFile);
  req.pipe(writeStream);

  writeStream.on('finish', async () => {
    const webpTarget = path.join(destDir, `${cleanId}.webp`);
    try {
      const isWork = cleanId.startsWith('work-');
      const tmpWebp = path.join(destDir, `${cleanId}_tmp.webp`);
      await sharp(targetFile)
        .resize(isWork ? 1000 : 1200, isWork ? 1000 : 675, { fit: isWork ? 'contain' : 'cover', position: 'center' })
        .webp({ quality: 82 })
        .toFile(tmpWebp);
      fs.copyFileSync(tmpWebp, webpTarget);
      fs.unlinkSync(tmpWebp);
    } catch (e) {
      console.error('Failed to convert to webp in server.js:', e);
    }

    if (cleanId === 'wedding' || cleanId === 'section-image') {
      try {
        fs.copyFileSync(targetFile, path.join(imagesDir, 'section-image.png'));
        fs.copyFileSync(targetFile, path.join(imagesDir, 'wedding.png'));
        fs.copyFileSync(targetFile, path.join(publicDir, 'web_wedding_img_1.png'));
        fs.copyFileSync(targetFile, path.join(publicDir, 'web wedding img 1.png'));
        if (fs.existsSync(webpTarget)) {
          fs.copyFileSync(webpTarget, path.join(imagesDir, 'section-image.webp'));
          fs.copyFileSync(webpTarget, path.join(imagesDir, 'wedding.webp'));
        }
      } catch (e) {
        console.error('Failed to copy wedding aliases:', e);
      }
    }

    if (cleanId === 'g1' || cleanId === 'grand-royal-wedding-reception-mandap') {
      try {
        fs.copyFileSync(targetFile, path.join(imagesDir, 'g1.png'));
        if (fs.existsSync(webpTarget)) {
          fs.copyFileSync(webpTarget, path.join(imagesDir, 'g1.webp'));
        }
      } catch (e) {
        console.error('Failed to copy g1 aliases:', e);
      }
    }

    // Also sync to dist if exists
    try {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        const distImages = path.join(distDir, 'images');
        if (fs.existsSync(distImages)) {
          let distDest = distImages;
          if (cleanId.startsWith('work-')) {
            distDest = path.join(distImages, 'works');
            if (!fs.existsSync(distDest)) {
              fs.mkdirSync(distDest, { recursive: true });
            }
          }
          fs.copyFileSync(targetFile, path.join(distDest, `${cleanId}.png`));
          if (fs.existsSync(webpTarget)) {
            fs.copyFileSync(webpTarget, path.join(distDest, `${cleanId}.webp`));
          }
          if (cleanId === 'wedding' || cleanId === 'section-image') {
            fs.copyFileSync(targetFile, path.join(distImages, 'section-image.png'));
            fs.copyFileSync(targetFile, path.join(distImages, 'wedding.png'));
            if (fs.existsSync(webpTarget)) {
              fs.copyFileSync(webpTarget, path.join(distImages, 'section-image.webp'));
              fs.copyFileSync(webpTarget, path.join(distImages, 'wedding.webp'));
            }
          }
        }
      }
    } catch (_) {}

    res.status(200).json({ success: true, id: cleanId, url: `/images/${cleanId}.png` });
  });

  writeStream.on('error', (err) => {
    res.status(500).json({ error: err.message });
  });
});

app.use(express.json());

// Serve static assets from dist
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
  }));
}

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, {
    maxAge: '1h',
  }));
}

// Health check endpoint for deployment platforms
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Single Page Application (SPA) routing fallback
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('Application is starting up or building...');
  }
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Production server listening on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
